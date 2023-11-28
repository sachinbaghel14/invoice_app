from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .data import *


# Create your views here.
class SignupView(APIView):
    def post(self, request):
        data = request.data
        data["user_id"] = len(user) + 1
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user.append(serializer.data)
            return Response(
                {"message": "Account created"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        data = request.data
        for val in user:
            if val["email"] == data["email"] and val["password"] == data["password"]:
                return Response(
                    {"message": "Login successfull.", "token": val["email"]},
                    status=status.HTTP_200_OK,
                )
        return Response(
            {"message": "email or password does not match"},
            status=status.HTTP_400_BAD_REQUEST,
        )

class InvoiceView(APIView):
    def get(self, request, id=None):
        if id is not None:
            for val in invoices:
                if val["Invoice_id"]==id:
                    serializer = InvoiceSerializer(val).data
                    return Response(serializer, status=status.HTTP_200_OK)
            return Response({"message":"No Invoice found"}, status=status.HTTP_200_OK)   
        serializer = InvoiceSerializer(invoices, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data
        data["Invoice_id"] = len(invoices)+1
        serializer = InvoiceSerializer(data=data)
        if serializer.is_valid():
            invoices.append(serializer.data)
            return Response({"message":"Created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class InvoiceDetailsView(APIView):
    def get(self, request, id):
        for val in invoices:
            if val["Invoice_id"]==id:
                serializer = InvoiceSerializer(val).data
                return Response(serializer, status=status.HTTP_200_OK)
        return Response({"message":"No Invoice found"}, status=status.HTTP_200_OK)

class addInvoiceItem(APIView):
    def post(self, request, id):
        for val in invoices:
            if val["Invoice_id"]==id:
                data = request.data
                serializer = ItemSerializer(data=data)
                if serializer.is_valid():
                    val["items"].append(serializer.data)
                    return Response({"message":f"Item added to {val['client_name']}"}, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message":"No Invoice found"}, status=status.HTTP_200_OK)

from django.urls import path
from .views import *


urlpatterns = [
    path("invoices/", InvoiceView.as_view(), name="invoice-get"),
    # path("invoicesdetails/<int:id>/", InvoiceView.as_view(), name="invoice-id"),
    path("invoices/<int:id>/", InvoiceDetailsView.as_view(), name="invoice-details"),
    path("invoices/<int:id>/item/", addInvoiceItem.as_view(), name="add-invoice-item"),
    path("invoices/new/", InvoiceView.as_view(), name="invoice-post"),
    path("user/signup/", SignupView.as_view(), name="signup"),
    path("user/login/", LoginView.as_view(), name="login"),
]

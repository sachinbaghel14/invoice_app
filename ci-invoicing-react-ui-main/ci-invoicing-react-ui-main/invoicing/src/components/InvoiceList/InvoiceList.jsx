import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'
import { Login } from '../Login/Login'

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([])
  const [login, setLogin] = useState(false)
  useEffect(() => {
    const loginToken = localStorage.getItem('token')
    console.log(loginToken)
    if (loginToken) {
      setLogin(true)
      console.log(login)
      fetch('http://127.0.0.1:8000/api/invoices/')
        .then((res) => res.json())
        .then((results) => {
          setInvoices(results)
          results.forEach((element) => {
            element.totalAmount = element.items.reduce(
              (total, item) =>
                Number(total) + Number(item.rate) * Number(item.quantity),
              0,
            )
          })
          console.log(invoices)
        })
    }

  }, [])

  return (
    <div className="container">
      {!login && <Login />}
      {login && <div> <Navbar />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Invoice No</th>
              <th scope="col">Client</th>
              <th scope="col">Date</th>
              <th scope="col">Total Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr>
                <th>{i.Invoice_id}</th>
                <td>{i.client_name}</td>
                <td>{new Date(i.date).toDateString()}</td>
                <td>{i.totalAmount}</td>
                <td>
                  <a href={"/"+i.Invoice_id} className="btn btn-warning">
                    Items
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  )
}

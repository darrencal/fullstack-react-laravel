import './RecentOrders.css';

const RecentOrders = () => {
  return (
    <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>jdoe@mail.com</td>
                    <td>$40</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Smith</td>
                    <td>mary@mail.com</td>
                    <td>$150</td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>jdoe@mail.com</td>
                    <td>$40</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Smith</td>
                    <td>mary@mail.com</td>
                    <td>$150</td>
                </tr>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>jdoe@mail.com</td>
                    <td>$40</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Smith</td>
                    <td>mary@mail.com</td>
                    <td>$150</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default RecentOrders;

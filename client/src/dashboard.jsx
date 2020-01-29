import React, {Component} from 'react';

class Dashboard extends Component {


    render() {
        if (this.props.location.state === undefined) {
            return (
                <div className="dashboard"> 
                    <div align="center" className="error">
                    <p>You must submit form first!</p>
                </div>
                </div>
                    )
        } else {
            const users = this.props.location.state.detail;
            console.log(users);
            return (
                 <div className="dashboard">            
                    <div align="center" className="logo">
                        <img className="img-logo" src="//logo.clearbit.com/verygoodsecurity.com" alt="VGS"></img>
                    </div>
                    <div align="center" className="company">
                        <p>Very Good Security</p>
                    </div>
                    <div align="center" className="title">
                        <p>Registered Users</p>
                    </div>
                    <div className="container">
                        <div className="table-wrapper">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Created at</th>
                                    </tr>
                                </thead>
                                {users.map((user, idx) => 
                                        (
                                            <tbody key={idx}>
                                            <tr>
                                                <td>{idx}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.password}</td>
                                                <td>{user.date}</td>
                                            </tr>
                                            </tbody>
                                        )
                                    )
                                }     
                            </table>
                        </div>
                    </div> 
                </div>
            )
        }
        
    }
}

export default Dashboard;
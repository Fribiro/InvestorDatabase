import React from 'react'

const Dashboard = () => {
    return (
    <div>
        <div class="main-content">
        
        <header>
            <div class="search-wrapper">
                <span class="ti-search"></span>
                <input type="search" placeholder="Search"/>
            </div>
            
            <div class="social-icons">
                <span class="ti-bell"></span>
                <span class="ti-comment"></span>
               
            </div>
        </header>
        
        <main>
            
            <h2 class="dash-title">Overview</h2>
            
            <div class="dash-cards">
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-briefcase"></span>
                        <div>
                            <h5>Entrepreneurs</h5>
                            <h4>17</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="">View all</a>
                    </div>
                </div>
                
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-reload"></span>
                        <div>
                            <h5>Investors</h5>
                            <h4>7</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="">View all</a>
                    </div>
                </div>
                
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-check-box"></span>
                        <div>
                            <h5>Transactions</h5>
                            <h4>1</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="">View all</a>
                    </div>
                </div>
            </div>
            
            
            {/* <section class="recent">
                <div class="activity-grid">
                    <div class="activity-card">
                        <h3>Recent activity</h3>
                        
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Team</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>App Development</td>
                                        <td>15 Aug, 2020</td>
                                        <td>22 Aug, 2020</td>
                                        <td class="td-team">
                                            <div class="img-1"></div>
                                            <div class="img-2"></div>
                                            <div class="img-3"></div>
                                        </td>
                                        <td>
                                            <span class="badge success">Success</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Logo Design</td>
                                        <td>15 Aug, 2020</td>
                                        <td>22 Aug, 2020</td>
                                        <td class="td-team">
                                            <div class="img-1"></div>
                                            <div class="img-2"></div>
                                            <div class="img-3"></div>
                                        </td>
                                        <td>
                                            <span class="badge warning">Processing</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Server setup</td>
                                        <td>15 Aug, 2020</td>
                                        <td>22 Aug, 2020</td>
                                        <td class="td-team">
                                            <div class="img-1"></div>
                                            <div class="img-2"></div>
                                            <div class="img-3"></div>
                                        </td>
                                        <td>
                                            <span class="badge success">Success</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Front-end Design</td>
                                        <td>15 Aug, 2020</td>
                                        <td>22 Aug, 2020</td>
                                        <td class="td-team">
                                            <div class="img-1"></div>
                                            <div class="img-2"></div>
                                            <div class="img-3"></div>
                                        </td>
                                        <td>
                                            <span class="badge warning">Processing</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Web Development</td>
                                        <td>15 Aug, 2020</td>
                                        <td>22 Aug, 2020</td>
                                        <td class="td-team">
                                            <div class="img-1"></div>
                                            <div class="img-2"></div>
                                            <div class="img-3"></div>
                                        </td>
                                        <td>
                                            <span class="badge success">Success</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="summary">
                        <div class="summary-card">
                            <div class="summary-single">
                                <span class="ti-id-badge"></span>
                                <div>
                                    <h5>196</h5>
                                    <small>Number of staff</small>
                                </div>
                            </div>
                            <div class="summary-single">
                                <span class="ti-calendar"></span>
                                <div>
                                    <h5>16</h5>
                                    <small>Number of leave</small>
                                </div>
                            </div>
                            <div class="summary-single">
                                <span class="ti-face-smile"></span>
                                <div>
                                    <h5>12</h5>
                                    <small>Profile update request</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bday-card">
                            <div class="bday-flex">
                                <div class="bday-img"></div>
                                <div class="bday-info">
                                    <h5>Dwayne F. Sanders</h5>
                                    <small>Birthday Today</small>
                                </div>
                            </div>
                            
                            <div class="text-center">
                                <button>
                                    <span class="ti-gift"></span>
                                    Wish him
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            
        </main>
        
        </div>
    </div>
    )
}

export default Dashboard

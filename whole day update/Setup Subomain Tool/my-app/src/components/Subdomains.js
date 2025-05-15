import React from 'react'

export const Subdomains = ({subdomains}) => {

    console.log('subdomains length:::', subdomains.length)
    console.log('subdomains:::', subdomains);
    if (subdomains.length === 0) return null

    const SubdomainRow = (subdomain,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{subdomain.id}</td>
                  <td>{subdomain.name}</td>
                  <td>{subdomain.content}</td>
                  <td>{subdomain.type}</td>
                  <td>{subdomain.created_on}</td>
              </tr>
          )
    }

    const subdomainTable = subdomains.subdomains.map((subdomain,index) => SubdomainRow(subdomain,index))

    return(
        <div className="container">
            <h2>Subdomains</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>IP address</th>
                    <th>Type</th>
                    <th>Created on</th>
                </tr>
                </thead>
                <tbody>
                    {subdomainTable}
                </tbody>
            </table>
        </div>
    )
}
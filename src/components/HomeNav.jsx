import React from 'react';

export default function HomeNav({go}) {
  return  (
    <nav aria-label="Page navigation example" className="">
        <ul className="pagination d-flex justify-content-around">
            <li className="page-item ">
                <a className="page-link bg-light" role="button" onClick={()=>go("left")} aria-label="Previous">
                    <span aria-hidden="true" className="text-dark fw-bold">&laquo;</span>
                </a>
            </li>
            <li className="page-item">
                <a className="page-link bg-light" role="button" onClick={()=>go("right")}  aria-label="Next">
                    <span aria-hidden="true" className="text-dark fw-bold">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
)
}

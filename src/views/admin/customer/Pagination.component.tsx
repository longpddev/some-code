import React from 'react';
import { Button, Icon } from 'react-materialize'
interface IPagination {
    totalPage: number,
    current: number,
    showMax?: number,
    paginate: (param: number) => void
}

const Pagination = ({totalPage, paginate, current }: IPagination)  => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className='pagination-customer'>
                <li>
                    <Button 
                        className={`page-item  ${current === 1 ? "disabled" : ""}`}
                        flat
                        node="button"
                        waves="light"
                        onClick={() => paginate(current > 1 ? current - 1 : 1)}
                    >
                        <Icon>
                            chevron_left
                        </Icon>
                    </Button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} >
                        <Button 
                        className={`page-item ${current === number ? "red active" : "light"}`}
                        flat
                        node="button"
                        waves={current === number ? "red" : "light" }
                        onClick={() => paginate(number)}>
                            {number}
                        </Button>
                    </li>
                ))}

                <li>
                    <Button 
                        className={`page-item ${current === totalPage ? "disabled" : ""}`}
                        flat
                        node="button"
                        waves="light"
                        onClick={() => paginate(current < totalPage ? current + 1 : current)}
                    >
                        <Icon>
                            chevron_right
                        </Icon>
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
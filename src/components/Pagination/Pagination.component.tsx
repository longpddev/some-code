import { useMemo, useRef } from 'react'
import { Button, Icon } from 'react-materialize'

import './Pagination.scss'

interface IPagination {
    totalPage: number,
    current: number,
    showMax?: number,
    goto: (param: number) => void
}

const Pagination: React.FC<IPagination> = ({totalPage, goto, current, showMax = 5 })  => {
    const page = useRef({
        startPage: current,
        endPage: current
    });

    if(page.current.startPage === current || page.current.endPage === current ) {
        const half = Math.round(showMax / 2)
        let startPage = current - half;
        let endPage = current + half;

        if(startPage < 1) {
            endPage += Math.abs(startPage)
            startPage = 1;
        }

        if(endPage > totalPage) {
            startPage -= endPage - totalPage;
            endPage = totalPage
        }

        if(startPage < 1) startPage = 1

        page.current = {
            startPage,
            endPage
        }
    }
    

    const pageNumbers = [];
    for (let i = page.current.startPage; i <= page.current.endPage; i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <ul className='c-pagination'>
                <li>
                    <Button 
                        className={`page-item  ${current === 1 ? "disabled" : ""}`}
                        flat
                        node="button"
                        waves="light"
                        onClick={() => goto(current > 1 ? current - 1 : 1)}
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
                        onClick={() => goto(number)}>
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
                        onClick={() => goto(current < totalPage ? current + 1 : current)}
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
//import type { ReactNode } from 'react';
import Table from '../../components/table/Table'
import TableRow from '../../components/tableRow/TableRow';
import { useEffect, useState } from 'react';
import TableFilter from '../tableFilter/TableFilter';
import { useQuery } from '@tanstack/react-query';
import { SafeFetchJson, GET } from '../../helpers/fetch';
import type { AgentFilterOptions } from '../../models/AgentFilterOptions';
import type { AgentFilterValues } from '../../models/AgentFilterValues';

export default function AgentTable() {

    type Person = {
        selected: boolean;
        name: string;
        job: string;
        color: string;
    };

    const rawData = [{
        selected: true,
        name: "Hart Hagerty",
        job: "Zemlak, Daniel and Leannon",
        color: "Purple"
    }, {
        selected: false,
        name: "Brice Swyre",
        job: "Caroll Group",
        color: "Red"
    }, {
        selected: false,
        name: "Marjy Frencz",
        job: "Rowe-Schoen",
        color: "Red"
    }, {
        selected: false,
        name: "Yancy Tear",
        job: "Wyman-Ledner",
        color: "Red"
    }];

    const [data, setData] = useState<Person[]>(rawData);

    const showSelector = true;
    const showDetail = true;

    const updater = (value: boolean, index: number) => {
        setData(prevItems =>
            prevItems.map((item, i) => ((i == index || index == -1) ? { ...item, selected: value } : item))
        );
    }

    const detailClick = (index: number) => {
        alert(JSON.stringify(data[index]));
    }








    const reloadData = () => {

        let output = Array.from(rawData);

        output = filterValues.color == "" ? output : rawData.filter(agent => agent.color == filterValues.color);
        output = filterValues.job == "" ? output : rawData.filter(agent => agent.job == filterValues.job);
        output = filterValues.name == "" ? output : rawData.filter(agent => agent.name == filterValues.name);

        setData(output);
    }



    const [filterOptions, setFilterOptions] = useState<AgentFilterOptions>({color: [], name: [], job: [] });
    useQuery({
        queryKey: ["filter"],
        queryFn: () => getCustomerFilter()
    });
    const getCustomerFilter = async () => {
        const data = await SafeFetchJson(`api/GetAgentFilter`, GET());
        setFilterOptions(data);
        return data;
    }





    const [filterValues, setFilterValues] = useState<AgentFilterValues>({ color: "", name: "", job: "" });
    useEffect(() => {
        reloadData();
    }, [filterValues])

    const applyFilter = (controlValue: string, name: string) => {
        setFilterValues({ ...filterValues, [name]: controlValue });
    }




    return (
        <>

            <TableFilter openEditor={() => alert("No editor!")} applyFilter={applyFilter} filterData={filterOptions}></TableFilter>

            <Table tableData={data} selector={showSelector} updater={updater} detail={showDetail} header={<><td>Name</td><td>Job</td><td>Favorite Color</td></>}>
                {
                    data.map((item, index) =>
                        <TableRow selector={showSelector} updater={updater} detail={showDetail} selected={item.selected} index={index} detailClick={detailClick}>
                            <td>{item.name}</td>
                            <td>{item.job}</td>
                            <td>{item.color}</td>
                        </TableRow>
                    )
                }
            </Table>
        </>
    )
}
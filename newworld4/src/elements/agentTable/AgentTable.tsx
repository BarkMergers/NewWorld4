//import type { ReactNode } from 'react';
import Table from '../../components/table/Table'
import TableRow from '../../components/tableRow/TableRow';
import { useEffect, useState } from 'react';
import TableFilter from '../tableFilter/TableFilter';
import { useQuery } from '@tanstack/react-query';
import { SafeFetchJson, GET } from '../../helpers/fetch';
import type { AgentFilterOptions } from '../../models/AgentFilterOptions';
import type { AgentFilterValues } from '../../models/AgentFilterValues';
import ColumnEditor from '../columEditor/ColumnEditor';
import type { ColumnData } from '../../models/ColumnData';
import type { Agent } from '../../models/Agent';

export default function AgentTable() {

    const rawData = [{
        selected: true,
        name: "Hart Hagerty",
        job: "Zemlak, Daniel and Leannon",
        color: "Purple",
        age: 23,
        height: 76
    }, {
        selected: false,
        name: "Brice Swyre",
        job: "Wyman-Ledner",
        color: "Red",
        age: 45,
        height: 54
    }, {
        selected: false,
        name: "Marjy Frencz",
        job: "Rowe-Schoen",
        color: "Red",
        age: 56,
        height: 58
    }, {
        selected: false,
        name: "Yancy Tear",
        job: "Wyman-Ledner",
        color: "Green",
        age: 39,
        height: 74
    }, {
        selected: false,
        name: "Boar Greysom",
        job: "Wixman White",
        color: "Purple",
        age: 54,
        height: 34
    }];

    const [data, setData] = useState<Agent[]>(rawData);

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




    const reloadData = () => {
        let output = Array.from(rawData);
        output = filterValues.color == "" ? output : output.filter(agent => agent.color == filterValues.color);
        output = filterValues.job == "" ? output : output.filter(agent => agent.job == filterValues.job);
        output = filterValues.name == "" ? output : output.filter(agent => agent.name == filterValues.name);

        setData(output);
    }
    const [filterValues, setFilterValues] = useState<AgentFilterValues>({ color: "", name: "", job: "" });
    useEffect(() => {
        reloadData();
    }, [filterValues])

    const applyFilter = (controlValue: string, name: string) => {
        setFilterValues({ ...filterValues, [name]: controlValue });
    }





    const [columnData, setColumnData] = useState<ColumnData[]>([]);
    useEffect(() => {
        let initialColumnData;
        try {
            const rawStorageData: string | null = localStorage.getItem("liststructure_myaccounts")
            if (rawStorageData == null) {
                initialColumnData = resetList();
            }
            else {
                initialColumnData = JSON.parse(rawStorageData!);
                if (initialColumnData == 'null' || initialColumnData == null)
                    initialColumnData = resetList();
            }
        }
        catch {
            initialColumnData = resetList();
        }
        setColumnData(initialColumnData);
    }, []);
    useEffect(() => {
        if (columnData == null) {
            localStorage.removeItem("liststructure_myaccounts");
        }
        else {
            localStorage.setItem("liststructure_myaccounts", JSON.stringify(columnData));
        }
    }, [columnData])
    const resetList = () => {
        return [
            { id: 0, "active": true, "name": "name", "text": "Name" },
            { id: 1, "active": true, "name": "job", "text": "Job" },
            { id: 2, "active": true, "name": "color", "text": "Color" },
            { id: 3, "active": false, "name": "height", "text": "Height" },
            { id: 4, "active": false, "name": "age", "text": "Age" },
        ]
    }








    const openEditor = () => {
        const dialog = document.getElementById('dialog_tableEditor') as HTMLDialogElement;
        dialog.showModal();
    }


    const getHeader = () => {
        return columnData != null && columnData.map((column: ColumnData) => { return column.active && <td>{column.text}</td> });
    }

    return (
        <>

            <ColumnEditor id="dialog_tableEditor" columnData={columnData} setColumnData={setColumnData} resetColumnData={resetList}></ColumnEditor>

            <TableFilter openEditor={openEditor} applyFilter={applyFilter} filterData={filterOptions}></TableFilter>

            <Table tableData={data} selector={showSelector} updater={updater} detail={showDetail} header={getHeader()}>
                {
                    data.map((item: Agent, index: number) =>
                        <TableRow selector={showSelector} updater={updater} detail={showDetail} selected={item.selected} index={index} detailClick={detailClick}>
                            {columnData != null && columnData.map((column: ColumnData) => {

                                if (column.active)
                                    return <td>{item[column.name as keyof typeof item]}</td>
                            })}
                        </TableRow>
                    )
                }
            </Table>
        </>
    )
}
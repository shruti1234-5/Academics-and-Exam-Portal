import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from "../components/AdminLayout";

const AdminYear = () => {
    const [year, setYear] = useState('');
    const [tableData, setTableData] = useState(null);
    const [editId, setEditId] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isEdit ? await axios.put(`http://localhost:5000/api/admin/year/${editId}`, { year }) :
                await axios.post('http://localhost:5000/api/admin/year/', { year });

            if (response.data.msg === 'Success') {
                toast.success(isEdit ? "Year updated successfully" : "Year added successfully");
                setYear("");
                setEditId("");
                setIsEdit(false);
                fetchYear();
            } else {
                toast.error(response.data.msg || "An error occurred");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Couldn't save year");
            console.error(error);
        }
    }

    const fetchYear = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/year/');
            if (res.data.msg === 'Success') {
                setTableData(res.data.value);
            } else {
                toast.error(res.data.msg || 'Failed to fetch years');
            }
        } catch (error) {
            toast.error('Failed to fetch years');
            console.error(error);
        }
    }

    const editYear = (e) => {
        setYear(e.year);
        setEditId(e._id);
        setIsEdit(true);
    }

    const deleteYear = async (id) => {
        if (!window.confirm("Are you sure you want to delete this year?")) return;
        try {
            const res = await axios.delete(`http://localhost:5000/api/admin/year/${id}`);
            if (res.data.msg === 'Success') {
                toast.success("Year deleted successfully");
                fetchYear();
            } else {
                toast.error(res.data.msg || "Couldn't delete year");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Couldn't delete year");
            console.error(error);
        }
    }

    useEffect(() => { fetchYear(); }, []);

    return (
        <AdminLayout> 
            <h3 className="mb-4 text-primary-nou">Year Management</h3>
            <div className="row">
                <div className="col-md-5">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-4 text-secondary-nou">{isEdit ? "Edit Year" : "Add Year"}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="yearInput" className="form-label">Year</label>
                                <input
                                    type="text"
                                    id="yearInput"
                                    value={year}
                                    className="form-control"
                                    onChange={(e) => { setYear(e.target.value) }}
                                    placeholder="e.g., 2024"
                                />
                            </div>
                            <button type="submit" className="hero-btn">
                                {isEdit ? "Update Year" : "Add Year"}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-4 text-secondary-nou">View Years</h5>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Year</th>
                                        <th>Created At</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData?.map((e, i) => (
                                        <tr key={e._id}>
                                            <td>{i + 1}</td>
                                            <td>{e.year}</td>
                                            <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                                            <td className="d-flex justify-content-center gap-2">
                                                <button className="btn btn-sm btn-outline-warning" onClick={() => { editYear(e) }}>
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" onClick={() => { deleteYear(e._id) }}>
                                                    <i className="fas fa-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminYear;
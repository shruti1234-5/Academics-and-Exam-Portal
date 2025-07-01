import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from "../components/AdminLayout";

const AdminStudentPage = () => {
    const [tableData, setTableData] = useState(null);

    const fetchStudent = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/student/');
            if (res.data.msg === 'Success') {
                setTableData(res.data.value);
            } else {
                toast.error(res.data.msg || "Failed to fetch students");
            }
        } catch (error) {
            toast.error("Failed to fetch students");
            console.error("Error fetching students:", error);
        }
    }

    const deleteStudent = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                const res = await axios.delete(`http://localhost:5000/api/admin/student/${id}`);
                if (res.data.msg === 'Success') {
                    toast.success("Student deleted successfully");
                    fetchStudent();
                } else {
                    toast.error(res.data.msg || "Failed to delete student");
                }
            } catch (error) {
                toast.error(error.response?.data?.msg || "Couldn't delete student");
                console.error("Error deleting student:", error);
            }
        }
    }

    useEffect(() => { fetchStudent(); }, []);

    return (
        <AdminLayout>
            <h3 className="mb-4 text-primary-nou">Student Management</h3>
            <div className="card shadow-sm p-4">
                <div className="table-responsive">
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Branch</th>
                                <th>Year</th>
                                <th>Program</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.map((e, i) => (
                                <tr key={e._id}>
                                    <td>{i + 1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.email}</td>
                                    <td>{e.branch}</td>
                                    <td>{e.year}</td>
                                    <td>{e.program}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => { deleteStudent(e._id) }}>
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminStudentPage;
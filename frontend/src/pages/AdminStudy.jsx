import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from "../components/AdminLayout";

const AdminStudy = ()=> {
    const [topic , setTopic] = useState('');
    const [description , setDescription] = useState('');
    const [doc , setDoc] = useState(null);
    const [study,setStudy] = useState(null);
    const [editId, setEditId] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setDoc(file);
        }
    }

    const handleSubmit = async(e)=>
        {
        e.preventDefault();
        if(!topic || !description) return toast.error("Please fill all fields");
        let formData = new FormData();
        formData.append('topic', topic);
        formData.append('description', description);
        if(doc) formData.append('doc', doc);

        try {
            const res = editId 
                ? await axios.put(`http://localhost:5000/api/admin/study/${editId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  }) 
                : await axios.post('http://localhost:5000/api/admin/study/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });

            if(res.data.msg === 'Success') {
                toast.success(`Material ${editId ? 'updated' : 'added'} successfully`);
                setTopic('');
                setDescription('');
                setDoc(null);
                setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = ''; // <-- reset file input
    fetchData();
            } else {
                toast.error(res.data.msg || 'An error occurred');
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || `Couldn't ${editId ? 'update' : 'add'} material`);
            console.error(error);
        }
    }

    const editStudy = (e) => {
        setTopic(e.topic);
        setDescription(e.description);
        setEditId(e._id);
    }

    const deleteStudy = async(id)=>{
        if (!window.confirm("Are you sure you want to delete this material?")) return;
        try {
            const res = await axios.delete(`http://localhost:5000/api/admin/study/${id}`);
            if(res.data.msg === 'Success') {
                toast.success("Deleted successfully");
                fetchData();
            } else {
                toast.error(res.data.msg || "Couldn't delete material");
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Couldn't delete material");
            console.log(error);
        }
    }

    const fetchData = async()=>{
        try {
            const res = await axios.get('http://localhost:5000/api/admin/study/');
            if(res.data.msg === 'Success') {
                setStudy(res.data.value);
            } else {
                toast.error(res.data.msg || 'Failed to fetch materials');
            }
        } catch (error) {
            toast.error('Failed to fetch materials');
            console.log(error);
        }
    }

    useEffect(()=>{ fetchData(); },[])

    return (
        <AdminLayout>
            <h3 className="mb-4 text-primary-nou">Study Materials Management</h3>
            <div className="row">
                <div className="col-md-5">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-4 text-secondary-nou">{editId ? 'Edit Material' : 'Add Material'}</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="topic" className="form-label">Topic</label>
                                <input type="text" id="topic" value={topic} className="form-control" onChange={(e)=>{setTopic(e.target.value)}} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea id="description" value={description} className="form-control" rows="4" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label">Upload File {editId && "(Optional)"}</label>
                                <input type="file" id="file" className="form-control" onChange={handleFileChange} ref={fileInputRef} />
                            </div>
                            <button type="submit" className="hero-btn">
                                {editId ? "Update Material" : "Add Material"}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-4 text-secondary-nou">View Materials</h5>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Topic</th>
                                        <th>Description</th>
                                        <th>File</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {study?.map((e,i)=>(
                                        <tr key={e._id}>
                                            <td>{i+1}</td>
                                            <td>{e.topic}</td>
                                            <td>{e.description}</td>
                                            <td>
                                                <a href={`http://localhost:5000/uploads/${e.doc}`} 
                                                   target="_blank" rel="noreferrer" className='btn btn-sm btn-outline-primary'>
                                                    <i className="fa fa-eye me-1"></i> View 
                                                </a>
                                            </td> 
                                            <td className="d-flex justify-content-center gap-2">
                                                <button className="btn btn-sm btn-outline-warning"
                                                    onClick={()=>{editStudy(e)}}>
                                                    <i className="fas fa-edit"></i> Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={()=>{deleteStudy(e._id)}}>
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
    )
}

export default AdminStudy;

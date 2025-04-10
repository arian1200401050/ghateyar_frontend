import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import config from '#src/config';

const TableContainer = styled.div`
    margin-top: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
`;

const Th = styled.th`
    padding: 12px;
    text-align: right;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
    padding: 12px;
    border-bottom: 1px solid #dee2e6;
    text-align: right;
`;

const Button = styled.button`
    padding: 6px 12px;
    margin: 0 4px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &.edit {
        background-color: #ffc107;
        color: #000;
        &:hover {
            background-color: #e0a800;
        }
    }

    &.delete {
        background-color: #dc3545;
        color: #fff;
        &:hover {
            background-color: #c82333;
        }
    }

    &.add {
        background-color: #28a745;
        color: #fff;
        margin-bottom: 20px;
        &:hover {
            background-color: #218838;
        }
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const Image = styled.img`
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const FileUpload = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const CRUDTable = ({ 
    title, 
    columns, 
    data, 
    pkColumn,
    endpoint, 
    refData = {}, 
    onDataChange 
}) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [editingPK, setEditingPK] = useState(null);

    const handleAdd = () => {
        setFormData({});
        setEditingPK(null);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditingPK(item[pkColumn]);
        setShowModal(true);
    };

    const handleDelete = async (pk) => {
        if (window.confirm('آیا از حذف این آیتم اطمینان دارید؟')) {
            try {
                await axios.delete(`${config.BACKEND_URL}/api/v1${endpoint}/${pk}/`);
                onDataChange();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingPK) {
                await axios.put(`${config.BACKEND_URL}/api/v1${endpoint}/${editingPK}/`, formData);
            } else {
                await axios.post(`${config.BACKEND_URL}/api/v1${endpoint}/`, formData);
            }
            setShowModal(false);
            onDataChange();
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <TableContainer>
            <Button className="add" onClick={handleAdd}>
                افزودن {title}
            </Button>
            
            <Table>
                <thead>
                    <tr>
                        {columns.map(column => (
                            column.showInList && (
                                <Th key={column.key}>{column.label}</Th>
                            )
                        ))}
                        <Th className="">عملیات</Th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {columns.map(column => (
                                column.showInList && (
                                    <Td key={column.key}>
                                        {column.render ? column.render(item) : item[column.key]}
                                    </Td>
                                )
                            ))}
                            <Td className="">
                                <Button className="edit" onClick={() => handleEdit(item)}>
                                    ویرایش
                                </Button>
                                <Button className="delete" onClick={() => handleDelete(item[pkColumn])}>
                                    حذف
                                </Button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <h2>{editingPK ? 'ویرایش' : 'افزودن'} {title}</h2>
                        <form onSubmit={handleSubmit}>
                            {columns.map(column => {
                                if (column.key === pkColumn) return null;

                                switch (column.elementType) {
                                    case ('ref'): {
                                        return (
                                            <FormGroup key={column.key}>
                                                <Label>{column.label}</Label>
                                                <Select
                                                    name={column.key}
                                                    value={formData[column.key] || ''}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">انتخاب کنید</option>
                                                    {refData[column.ref]?.map(item => (
                                                        <option key={item.pk} value={item.pk}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormGroup>
                                        );
                                    }
                                    case ('textarea'): {
                                        return (
                                            <FormGroup key={column.key}>
                                                <Label>{column.label}</Label>
                                                <TextArea
                                                    name={column.key}
                                                    value={formData[column.key] || ''}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        );
                                    }
                                    case ('image'): {
                                        return (
                                            formData[column.key].map((index, path) => {
                                                <FormGroup key={column.key}>
                                                    <Label>{column.label}</Label>
                                                    <FileUpload
                                                        type="file"
                                                        name={`${column.key}-${index}`}
                                                        value={path || ''}
                                                        onChange={handleChange}
                                                    />
                                                </FormGroup>
                                            })
                                        );
                                    }
                                    default: {
                                        return (
                                            <FormGroup key={column.key}>
                                                <Label>{column.label}</Label>
                                                <Input
                                                    type="text"
                                                    name={column.key}
                                                    value={formData[column.key] || ''}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        );
                                    }
                                }

                                
                            })}
                            <Button type="submit">ذخیره</Button>
                            <Button type="button" onClick={() => setShowModal(false)}>
                                انصراف
                            </Button>
                        </form>
                    </ModalContent>
                </Modal>
            )}
        </TableContainer>
    );
};

export default CRUDTable; 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import config from '#src/config';
import { useAdmin } from '#src/context/AdminContext';

const TableContainer = styled.div`
    margin-top: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
`;

const Th = styled.th`
    padding: 1rem 2rem;
    text-align: right;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;

    &.counter {
        padding: 0;
        text-align: center;
    }
`;

const Td = styled.td`
    padding: 1rem 2rem;
    border-bottom: 1px solid #dee2e6;
    text-align: right;

    &.counter {
        padding: 0;
        text-align: center;
    }
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
        font-size: 1.1rem;
        background-color: #28a745;
        color: #fff;
        margin-bottom: 20px;
        &:hover {
            background-color: #218838;
        }
    }

    &.save {
        background-color: #28a745;
        color: #fff;
        &:hover {
            background-color: #218838;
        }
    }

    &.cancel {
        background-color: #dc3545;
        color: #fff;
        &:hover {
            background-color: #c82333;
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
    max-height: 100%;
    overflow-y: auto;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;

    &.checkbox {
        display: flex
    }
`;

const Label = styled.label`
    display: block;
    margin-bottom: .5rem;
    font-weight: 600;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;

    &.checkbox {
        width: 2rem;
        margin-right: 2rem;
    }
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

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0 1.5rem;
    position: relative;
`;

const ScrollButton = styled.button`
    padding: 5px 10px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: #2e5b98;
    color: var(--color-white);
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-weight: 800;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const LeftScrollButton = styled(ScrollButton)`
    left: 0;
`;

const RightScrollButton = styled(ScrollButton)`
    right: 0;
`;

const PageNumberWrapper = styled.div`
    width: ${props => props.$isSidebarOpen ? 'calc(100vw - 33rem)' : 'calc(100vw - 12rem)'};
    overflow: hidden;
`;

const PageNumbersContainer = styled.div`
    position: relative;
    left: ${props => `${props.$scrollPosition}px`};
    width: fit-content;
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    transition: left .800s ease-in-out;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

const PageButton = styled.button`
    padding: 5px 10px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: ${props => props.$active ? '#2e5b98' : 'white'};
    color: ${props => props.$active ? 'white' : 'black'};
    cursor: pointer;
    min-width: 36px;
    text-align: center;
    white-space: nowrap;

    &:hover {
        background-color: ${props => props.$active ? '#0056b3' : '#f8f9fa'};
    }
`;

const ImageListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ImageItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ImagePreview = styled.img`
    width: 20rem;
    height 3rem;
    object-fit: contain;
    border-radius: 4px;
`;

const MoveButton = styled.button`
    padding: 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
`;

const CRUDTable = ({ 
    title, 
    listColumns = [], 
    formColumns = [],
    pkColumn,
    endpoint, 
    refData = {}, 
    refCallbacks = {},
}) => {
    const { isSidebarOpen } = useAdmin();
    const [showModal, setShowModal] = useState(false);
    const [originalFormData, setOriginalFormData] = useState({});
    const [formData, setFormData] = useState({});
    const [editingPK, setEditingPK] = useState(null);
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [pageNumbersScrollDivision, setPageNumbersScrollDivision] = useState(0);
    const pageNumbersContainerRef = React.useRef(null);
    const pageNumberWrapperRef = React.useRef(null);

    const fetchList = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.BACKEND_URL}/${endpoint}/`, {
                params: { page, page_size: pageSize },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            
            setListData(response.data);
            setTotalPages(Math.ceil(response.data.length / pageSize));
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDetail = async (pk) => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.BACKEND_URL}/${endpoint}/${pk}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setFormData(response.data);
            setOriginalFormData(response.data);
        } catch (error) {
            console.error('Error fetching item:', error);
        } finally {
            setLoading(false);
        }
    };

    const getChangedFields = () => {
        const changed = {};
        for (const key in formData) {
            if (formData[key] !== originalFormData[key]) {
                changed[key] = formData[key];
            }
        }
        return changed;
    };

    const handleAdd = () => {
        setFormData({});
        setFormData({});
        setEditingPK(null);
        setShowModal(true);
    };

    const handleEdit = async (item) => {
        setFormData({});
        await fetchDetail(item[pkColumn]);
        setEditingPK(item[pkColumn]);
        setShowModal(true);
    };

    const handleDelete = async (pk) => {
        if (window.confirm('آیا از حذف این آیتم اطمینان دارید؟')) {
            try {
                await axios.delete(`${config.BACKEND_URL}/${endpoint}/${pk}/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                fetchList(currentPage);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            const changedFields = getChangedFields();
            // console.log(changedFields);
            // return null;
            Object.entries(changedFields).forEach(([key, value]) => {
                if (Array.isArray(value) && value[0] instanceof File) {
                    value.forEach(file => formDataToSend.append(key, file));
                } else {
                    formDataToSend.append(key, value);
                }
            });

            if (editingPK) {
                await axios.patch(`${config.BACKEND_URL}/${endpoint}/${editingPK}/`, formDataToSend, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post(`${config.BACKEND_URL}/${endpoint}/`, formDataToSend, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setShowModal(false);
            fetchList(currentPage);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        console.log(formData);
        console.log(name, value, type, files);
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: Array.from(files)
            }));
        } else if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: e.target.checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const moveImage = (index, direction) => {
        const newImages = [...formData.images];
        const newIndex = index + direction;
        if (newIndex >= 0 && newIndex < newImages.length) {
            [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
            setFormData(prev => ({
                ...prev,
                images: newImages
            }));
        }
    };

    const scrollLeft = () => {
        if (pageNumbersContainerRef.current) {
            const newScrollPosition = scrollPosition + 800;
            const clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, pageNumbersScrollDivision)); 
            setScrollPosition(clampedScrollPosition);
        }
    };

    const scrollRight = () => {
        if (pageNumbersContainerRef.current) {
            const newScrollPosition = scrollPosition - 800;
            const clampedScrollPosition = Math.max(0, Math.min(newScrollPosition, pageNumbersScrollDivision)); 
            setScrollPosition(clampedScrollPosition);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setPageNumbersScrollDivision(
                pageNumbersContainerRef.current.getBoundingClientRect().width - 
                pageNumberWrapperRef.current.getBoundingClientRect().width
            );
        }, 1000);
    }, [pageNumberWrapperRef.current]);

    const renderFormField = (column) => {
        switch (column.elementType) {
            case 'textarea':
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
            case 'image':
                const isMultiple = column.multiple || false;
                if (isMultiple) {
                    return (
                        <FormGroup key={column.key}>
                            <Label>{column.label}</Label>
                            <ImageListContainer>
                                {(formData[column.key] || []).map((image, index) => (
                                    <ImageItem key={index}>
                                        <MoveButton onClick={() => moveImage(index, -1)}>↑</MoveButton>
                                        <MoveButton onClick={() => moveImage(index, 1)}>↓</MoveButton>
                                        <ImagePreview src={image instanceof File ? URL.createObjectURL(image) : image} />
                                        <FileUpload
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const newImages = [...formData[column.key]];
                                                newImages[index] = e.target.files[0];
                                                setFormData(prev => ({
                                                    ...prev,
                                                    [column.key]: newImages
                                                }));
                                            }}
                                        />
                                    </ImageItem>
                                ))}
                                <Button onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        [column.key]: [...(prev[column.key] || []), null]
                                    }));
                                }}>
                                    Add Image
                                </Button>
                            </ImageListContainer>
                        </FormGroup>
                    );
                } else {
                    const imageSrc = formData[column.key] instanceof File ? 
                        URL.createObjectURL(formData[column.key]) : 
                        formData[column.key] || '';
                    return (
                        <FormGroup key={column.key}>
                            <Label>{column.label}</Label>
                            <ImageListContainer>
                                <ImageItem>
                                    <ImagePreview 
                                        src={imageSrc !== '' ? imageSrc : null} 
                                    />
                                    <FileUpload
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                [column.key]: e.target.files[0]
                                            }));
                                        }}
                                    />
                                </ImageItem>
                            </ImageListContainer>
                        </FormGroup>
                    );
                }
            case 'checkbox':
                return (
                    <FormGroup className="checkbox" key={column.key}>
                        <Label>{column.label}</Label>
                        <Input className="checkbox"
                            type="checkbox"
                            name={column.key}
                            checked={formData[column.key] || false}
                            onChange={handleChange}
                        />
                    </FormGroup>
                );
            case 'select':
                const {pkColumn, options} = refData[column.ref] || (refCallbacks[column.ref]?.() || []);
                
                return (
                    <FormGroup key={column.key}>
                        <Label>{column.label}</Label>
                        <Select
                            name={column.key}
                            value={formData[column.key]?.[pkColumn] || formData[column.key] || ''}
                            onChange={handleChange}
                        >
                            <option value="">انتخاب کنید</option>
                            {options?.map(option => (
                                <option key={option[pkColumn]} value={option[pkColumn]}>
                                    {option.title}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                );
            default:
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
    };

    return (
        <TableContainer>
            <Button className="add" onClick={handleAdd}>
                افزودن {title}
            </Button>
            
            <Table>
                <thead>
                    <tr>
                        <Th className="counter">ردیف</Th>
                        {listColumns.map(column => (
                            <Th key={column.key}>{column.label}</Th>
                        ))}
                        <Th>عملیات</Th>
                    </tr>
                </thead>
                <tbody>
                    {listData.map((item, index) => (
                        <tr key={index}>
                            <Td className="counter">{index + 1}</Td>
                            {listColumns.map(column => (
                                <Td key={column.key}>
                                    {column.render ? column.render(item) : item[column.key]}
                                </Td>
                            ))}
                            <Td>
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

            <PaginationContainer >
                <RightScrollButton 
                    onClick={scrollRight}
                    disabled={scrollPosition <= 0}
                >
                    →
                </RightScrollButton>
                <PageNumberWrapper 
                    ref={pageNumberWrapperRef}
                    $isSidebarOpen={isSidebarOpen}
                >
                    <PageNumbersContainer 
                        ref={pageNumbersContainerRef}
                        $scrollPosition={scrollPosition}
                    >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <PageButton
                                key={page}
                                $active={page === currentPage}
                                onClick={() => fetchList(page)}
                            >
                                {page}
                            </PageButton>
                        ))}
                    </PageNumbersContainer>
                </PageNumberWrapper>
                
                <LeftScrollButton 
                    onClick={scrollLeft}
                    disabled={scrollPosition >= pageNumbersScrollDivision}
                >
                    ←
                </LeftScrollButton>
            </PaginationContainer>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <h2 className='text-lg font-semibold mb-6'>{editingPK ? 'ویرایش' : 'افزودن'} {title}</h2>
                        <form onSubmit={handleSubmit}>
                            {formColumns.map(column => (
                                renderFormField(column)
                            ))}
                            <Button className="save" type="submit">ذخیره</Button>
                            <Button className="cancel" type="button" onClick={() => setShowModal(false)}>
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
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import lodash from 'lodash';

import config from '#src/config';
import { useAdmin } from '#src/context/AdminContext';
import { getValueByPath, setValueByPath } from '#src/utils/objectUtils';
import { formDataToJson } from '#src/utils/formUtils';
import { useArticleEditor } from './CKEditorBuild';

import './CRUDTableStyled';

import styled from 'styled-components';

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

    &.add-image {
        background-color: #28a745;
        color: #fff;
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
    width: 40rem;
    max-width: 90%;
    max-height: 100%;
    overflow-y: auto;
    position: relative;

    &.grid {
        width: 70rem;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
    background-color:rgb(170, 170, 170);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 4px;

    &:hover {
        background-color:rgb(145, 145, 145);
    }
`;

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;

    &.checkbox {
        display: flex
    }

    &.group {
        grid-column: 1 / -1;
    }

    &.wordpad {
        grid-column: 1 / -1;
        max-width: 65rem;
    }
`;

const GroupContainer = styled.div`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
`;

const GroupGroup = styled.div`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: #f8f9fa;
`;

const GroupTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #495057;
`;

const GroupContent = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`;

const Label = styled.label`
    display: block;
    margin-bottom: .5rem;
    font-weight: 600;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;

    &.checkbox {
        width: 2rem;
        height: 2rem;
        margin-right: 2rem;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const WordPad = styled.textarea`
    width: 100%;
    padding: 8px;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const Image = styled.img`
    width: 100%;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const ImageListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ImageItem = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
    flex-wrap: wrap;
    padding: .5rem;
    border-radius: 5px;
    background-color: #f1f1f1;
`;

const ImagePreview = styled.img`
    width: 23rem;
    height: 7rem;
    object-fit: contain;
    border-radius: 4px;

    &.image-list {
        width: 100%;
        height: 6rem;
    }
`;

const MoveButton = styled.button`
    padding: 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
`;

const DeleteButton = styled.button`
    padding: .8rem;
    background-image: url('/icon/trash.svg');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    cursor: pointer;
`;

const FileUploadLabel = styled.label`
    width: unset;
    margin: auto auto auto 3rem;
    padding: .5rem 2rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color:rgb(0, 104, 208);
    color: white;
    cursor: pointer;

    &:hover {
        background-color:rgb(0, 89, 179);
    }
`;

const FileUpload = styled.input`
    display: none;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const SelectContainer = styled.div`
    position: relative;
    width: 100%;
`;

const SelectList = styled.div`
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;
    z-index: 1000;
    margin-bottom: 5px;
`;

const SelectOption = styled.div`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f8f9fa;
    }
`;

const SelectedItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: .5rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
`;

const SelectedItem = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #e9ecef;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: default;
`;

const RemoveButton = styled.button`
    position: absolute;
    top: -.25rem;
    left: -.25rem;
    background: #dc3545;
    border: 1px solid #dc3545;
    border-radius: 100%;
    color: white;
    cursor: pointer;
    padding: 6px 5px 4px;
    line-height: 1;
    width: 0;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #c82333;
        border: 1px solid #c82333;
    }
`;

const RemoveIcon = styled.span`
    font-size: .9rem;
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


const CRUDTable = ({ 
    title, 
    listColumns = [], 
    formColumns = [],
    pkColumn,
    endpoint, 
    refData = {}, 
    refCallbacks = {},
    isGrid = false,
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
    const pageNumbersContainerRef = useRef(null);
    const pageNumberWrapperRef = useRef(null);
    const imageItemsRef = useRef([]);
    const [editors, setEditors] = useState({});
    const editorRefs = useRef({});
    const { editorConfig: ArticleEditorConfig, ClassicEditor } = useArticleEditor()


    const fetchList = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.BACKEND_URL}/${endpoint}/`, {
                params: { limit: pageSize, offset: (page - 1) * pageSize },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            
            setListData(response.data.results);
            setTotalPages(Math.ceil(response.data.count / pageSize));
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
            // console.log(response.data);
            setFormData(response.data);
            setOriginalFormData(lodash.cloneDeep(response.data));
        } catch (error) {
            console.error('Error fetching item:', error);
        } finally {
            setLoading(false);
        }
    };

    const getChangedFields = () => {
        const changed = {};
        for (const key in formData) {
            if (!lodash.isEqual(formData[key], originalFormData[key])) {
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

            console.log(changedFields)
            
            Object.entries(changedFields).forEach(([key, value]) => {
                if (value instanceof File) {
                    formDataToSend.append(key, value)
                } else if (key === 'images') {
                    // Handle image operations
                    console.log(value)
                    value.forEach((img, index) => {
                        if (img.image instanceof File) {
                            // For new/updated images, send the file with the correct key format
                            formDataToSend.append(`images.${index}.image`, img.image);
                            if (img.product_image_uuid) {
                                formDataToSend.append(`images.${index}.product_image_uuid`, img.product_image_uuid);
                            }
                            if (img.order !== undefined) {
                                formDataToSend.append(`images.${index}.order`, img.order);
                            }
                        } else if (img.image === null) {
                            // For image removal, send the UUID and empty image
                            formDataToSend.append(`images.${index}.product_image_uuid`, img.product_image_uuid);
                            formDataToSend.append(`images.${index}.image`, '');
                        } else if (img.order !== undefined) {
                            // For order changes only
                            formDataToSend.append(`images.${index}.product_image_uuid`, img.product_image_uuid);
                            formDataToSend.append(`images.${index}.order`, img.order);
                        }
                    });
                } else if (typeof value === 'object' && !Array.isArray(value)) {
                    formDataToSend.append(key, JSON.stringify(value));
                } else if (Array.isArray(value)) {
                    formDataToSend.append(key, JSON.stringify(value));
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
        const { name, type, files } = e.target;
        const value = type === 'checkbox' ? e.target.checked : e.target.value;
        
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: Array.from(files)
            }));
        } else {
            setFormData(prev => setValueByPath(prev, name, value));
        }
    };

    const moveImage = (e, columnKey, index, direction) => {
        e.preventDefault();
        setFormData(prev => {
            const newImages = [...prev[columnKey]];
            console.log(newImages);
            debugger;
            const newIndex = parseInt(index, 10) + parseInt(direction, 10);
            if (newIndex >= 0 && newIndex < newImages.length) {
                [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
                // Update orders
                newImages.forEach((img, i) => {
                    img.order = i;
                });
                return {
                    ...prev,
                    [columnKey]: newImages
                };
            }
            return prev;
        });
    };

    const deleteImage = (e, columnKey, index) => {
        e.preventDefault();
        setFormData(prev => {
            const newImages = [...prev[columnKey]];
            if (!newImages[index].product_image_uuid) {
                // New image - just remove it
                newImages.splice(index, 1);
            } else {
                // Existing image - mark for deletion
                newImages[index] = {
                    ...newImages[index],
                    image: null
                };
            }
            return {
                ...prev,
                [columnKey]: newImages
            };
        });
    };

    const updateImage = (e, columnKey, index) => {
        const file = e.target.files[0];
        console.log(formData[columnKey])
        
        if (file) {
            setFormData(prev => {
                const newImages = [...prev[columnKey]];
                newImages[index]['image'] = file;
                debugger;
                return {
                    ...prev,
                    [columnKey]: newImages
                };
            });
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
        try {
            setTimeout(() => {
                setPageNumbersScrollDivision(
                    pageNumbersContainerRef.current.getBoundingClientRect().width - 
                    pageNumberWrapperRef.current.getBoundingClientRect().width
                );
            }, 1000);
        } catch (err) {
            // console.log(err)
        }
        
    }, [pageNumberWrapperRef.current]);

    useEffect(() => {
        // Initialize CKEditor for each wordpad field
        formColumns.forEach(column => {
            if (column.elementType === 'wordpad') {
                const element = editorRefs.current[column.key];

                if (element && !editors[column.key]) {
                    ArticleEditorConfig.initialData = formData[column.key];

                    ClassicEditor
                        .create(element, ArticleEditorConfig)
                        .then(editor => {
                            editor.model.document.on('change:data', () => {
                                const content = editor.getData();
                                setFormData(prev => setValueByPath(prev, column.key, content));
                            });

                            setEditors(prev => ({
                                ...prev,
                                [column.key]: editor
                            }));
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }
        });

        // Cleanup function to destroy editors when component unmounts
        return () => {
            Object.keys(editors).forEach(editorKey => {
                if (!showModal) {
                    delete editors[editorKey];
                    console.log('destroy editor!')
                }
            });
        };
    }, [formColumns, showModal]); // Add showModal to dependencies to reinitialize when modal opens

    const renderFormField = (column) => {
        const isMultiple = column.isMultiple || false;
        const value = getValueByPath(formData, column.key) || '';

        switch (column.elementType) {
            case 'group':
                return (
                    <FormGroup className='group' key={column.key}>
                        <Label>{column.label}</Label>
                        <GroupContainer>
                            {Object.entries(column.groups).map(([groupKey, group]) => (
                                <GroupGroup key={groupKey}>
                                    <GroupTitle>{group.label}</GroupTitle>
                                    <GroupContent>
                                        {group.columns.map(subColumn => {
                                            const fullKey = `${column.key}.${groupKey}.${subColumn.key}`;
                                            return renderFormField({
                                                ...subColumn,
                                                key: fullKey,
                                                value: value
                                            });
                                        })}
                                    </GroupContent>
                                </GroupGroup>
                            ))}
                        </GroupContainer>
                    </FormGroup>
                );
            case 'textarea':
                return (
                    <FormGroup key={column.key}>
                        <Label>{column.label}</Label>
                        <TextArea
                            name={column.key}
                            value={value}
                            onChange={handleChange}
                        />
                    </FormGroup>
                );
            case 'image':
                if (isMultiple) {
                    return (
                        <FormGroup key={column.key}>
                            <Label>{column.label}</Label>
                            <ImageListContainer>
                                {(value !== '' ? Object.entries(value) : []).map(([index, {product_image_uuid, image}]) => (
                                    (!(product_image_uuid && !image)) && (
                                        <ImageItem key={index} ref={(element) => imageItemsRef.current.push(element)}>
                                            <MoveButton onClick={(e) => moveImage(e, column.key, index, -1)}>↑</MoveButton>
                                            <MoveButton onClick={(e) => moveImage(e, column.key, index, 1)}>↓</MoveButton>
                                            <DeleteButton onClick={(e) => deleteImage(e, column.key, index)}></DeleteButton>
                                            <FileUploadLabel>
                                                <FileUpload
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => updateImage(e, column.key, index)}
                                                />
                                                <span>انتخاب</span>
                                            </FileUploadLabel>
                                            <ImagePreview 
                                                src={image instanceof File ? 
                                                    URL.createObjectURL(image) : 
                                                    image ? `${image}` : null
                                                } 
                                                className="image-list"
                                            />
                                        </ImageItem>
                                    )
                                ))}
                                <Button className="add-image" onClick={(e) => {
                                    e.preventDefault();
                                    setFormData(prev => ({
                                        ...prev,
                                        [column.key]: [...prev[column.key], {}]
                                    }));
                                }}>
                                    افزودن تصویر
                                </Button>
                            </ImageListContainer>
                        </FormGroup>
                    );
                } else {
                    // Handle single image case if needed
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
                                    <FileUploadLabel>
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
                                        <span>انتخاب</span>
                                    </FileUploadLabel>
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
                            checked={value || false}
                            onChange={handleChange}
                        />
                    </FormGroup>
                );
            case 'select':
                const {pkColumn, options} = refData[column.ref] || (refCallbacks[column.ref]?.() || []);
                
                if (isMultiple) {
                    const selectedValues = value || [];
                    const selectedOptions = selectedValues.map(value => 
                        options?.find(option => option[pkColumn] === value)
                    ).filter(Boolean);
        
                    return (
                        <FormGroup key={column.key}>
                            <Label>{column.label}</Label>
                            <SelectContainer>
                                <SelectList>
                                    {options?.map(option => (
                                        <SelectOption 
                                            key={option[pkColumn]} 
                                            onClick={() => {
                                                if (!selectedValues.includes(option[pkColumn])) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        [column.key]: [...(prev[column.key] || []), option[pkColumn]]
                                                    }));
                                                }
                                            }}
                                        >
                                            {option.title}
                                        </SelectOption>
                                    ))}
                                </SelectList>
                                <SelectedItemsContainer>
                                    {selectedOptions.map(option => (
                                        <SelectedItem key={option[pkColumn]}>
                                            <RemoveButton 
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        [column.key]: prev[column.key].filter(
                                                            value => value !== option[pkColumn]
                                                        )
                                                    }));
                                                }}
                                            >
                                                <RemoveIcon>×</RemoveIcon>
                                            </RemoveButton>
                                            {option.title}
                                        </SelectedItem>
                                    ))}
                                </SelectedItemsContainer>
                            </SelectContainer>
                        </FormGroup>
                    );
                } else {
                    return (
                        <FormGroup key={column.key}>
                            <Label>{column.label}</Label>
                            <Select
                                name={column.key}
                                value={value?.[pkColumn] || value}
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
                }
            case 'wordpad': 
                return (
                    <FormGroup key={column.key} className="wordpad">
                        <Label>{column.label}</Label>
                        <WordPad
                            id={`wordpad_${column.key}`}
                            ref={el => editorRefs.current[column.key] = el}
                            name={column.key}
                            value={value}
                            onChange={handleChange}
                        />
                    </FormGroup>
                );
            default:
                return (
                    <FormGroup key={column.key}>
                        <Label>{column.label}</Label>
                        <Input
                            type="text"
                            name={column.key}
                            value={value}
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
                <Modal id="form-modal">
                    <ModalContent className={isGrid ? 'grid' : ''}>
                        <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
                        <h2 className='text-lg font-semibold mb-6'>{editingPK ? 'ویرایش' : 'افزودن'} {title}</h2>
                        <form onSubmit={handleSubmit}>
                            {isGrid ? (
                                <FormGrid>
                                    {formColumns.map(column => (
                                        renderFormField(column)
                                    ))}
                                </FormGrid>
                            ) : (
                                formColumns.map(column => (
                                    renderFormField(column)
                                ))
                            )}
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
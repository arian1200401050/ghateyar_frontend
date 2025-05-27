import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '#src/config';
import NotFound from '#src/plugins/Error/NotFound';
import Summary from "#src/plugins/Product/summary";
import Supplementary from "#src/plugins/Product/supplementary";


const ProductPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [product, setProduct] = useState(null);  
    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async (productId) => {
            try {  
                const productRes = await axios.get(`${config.BACKEND_URL}/api/v1/product/product/${productId}/`);
                console.log(productRes);
                setProduct(productRes.data);  
                setProduct(prev => ({
                    ...prev, 
                    // bug fixes
                    comments: {total: 0, rows: []},
                    article: {article_id: 1, title: 'مقاله اول'},
                    video: {video_id: 1, title: 'ویدیو اول'}
                }));
                setLoading(false);  
            } catch (err) {  
                setError(err);  
                setLoading(false);  
            }  
        };

        fetchProduct(productId); 
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.log(`Error loading product: ${error.message}`);

        return <NotFound>{`محصول با شناسه "${productId}" یافت نشد!`}</NotFound>
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="main-container !w-(--main-section-full-width) mx-auto p-5">
            <Helmet>
                <title>{`محصول ${product.title}`}</title>    
            </Helmet>

            <Summary product={product} />
            <Supplementary attributes={product.attributes.secondary} comments={product.comments} />
        </div>
    );
};

export default ProductPage;

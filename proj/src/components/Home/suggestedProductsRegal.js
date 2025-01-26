import './styles/suggestedProductsRegal.scss';

function SuggestedProductsRegal() {
    return (
        <div className="product-regal-wrapper my-4">
            <div className="product-regal rounded border border-1 border-black bg-purple-1 py-2 pe-5">
                <div className="card product-card">
                    <div className="w-100 product-card__image-wrapper">
                        <img src="image/part_1.jpg" className="card-img-top h-100 object-fit-contain product-card__image" alt="..." />
                    </div>
                    <div className="card-body text-start bg-gray-1">
                        <div classNaem="product-card__title-wrapper">
                            <h5 className="card-title">فیلتر آب خارجی یخچال</h5>
                        </div>
                        <div className="container product-card__text-wrapper">
                            <div className="row product-card__text-inner">
                                <div className="col col-10 product-card__price-section">
                                    <span className="d-block card-text"><small className="text-muted">950,000</small></span>
                                    <span className="d-block card-text">600,000</span>
                                </div>
                                <div className="col col-2 d-flex align-items-center px-0 product-card__discount-section">
                                    <span className="badge bg-red-2 product-card__discount">10%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SuggestedProductsRegal;

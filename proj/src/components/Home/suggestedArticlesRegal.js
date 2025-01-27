import { mainArticles } from '../../db/mainArticles.js';

import './styles/suggestedArticlesRegal.scss';

function SuggestedArticlesRegal() {
    return (
        <div className="article-regal-wrapper">
            <div className="article-regal my-5">
                <div className="article-regal__header mb-3">
                    <h4 className="article-regal__header-title d-inline me-3 px-3 pb-1 border-bottom border-black">
                        وبلاگ
                    </h4>
                </div>
                <div className="article-regal__body py-3 border border-1 border-gray-3 rounded bg-yellow-1">
                    <div className="article-regal__inner-wrapper mx-3 overflow-hidden">
                        <div className="article-regal__inner d-flex w-fit-content ">
                            {mainArticles.map((item, index) => (
                                <div className="card mx-2 border border-1 border-gray-3 article-card">
                                    <div className="row w-100 h-100 m-0 article-card__inner">
                                        <div className="col-4 h-100 border-start border-1 border-gray-3 article-card__image-wrapper">
                                            <img src={`image/${item.banner}`} alt={ item.title } 
                                                className="card-img-top h-100 object-fit-contain article-card__image" />
                                        </div>
                                        <div className="card-body col-8 pt-3 pe-3 h-100 overflow-hidden rounded-start text-end bg-gray-1">
                                            <div className="article-card__title-wrapper">
                                                <h5 className="card-title">{ item.title }</h5>
                                            </div>
                                            <div className="article-card__text-wrapper">
                                                <p className="card-text">{ item.description }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SuggestedArticlesRegal;
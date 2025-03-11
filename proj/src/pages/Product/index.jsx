import { Helmet } from 'react-helmet';

import Summary from "#src/plugins/Product/summary";
import Supplementary from "#src/plugins/Product/supplementary";


const ProductPage = () => {
    const product = {
        title: "موتور جاروبرقی میکا",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        score: 4.5,
        price: "150000",
        mainAttributes: {
            color: "قرمز",
            material: "برنز",
            weight: "900",
            width: "150",
            length: "125",
            height: "30",
        },
        otherAttributes: {
          group1: {
              feature1: "Feature 1",
              feature2: "Feature 2",
          },
          group2: {
              feature3: "Feature 3",
              feature4: "Feature 4",
              feature5: "Feature 5",
          },
        },
        images: ["product_1.png", "product_2.png", "product_3.png"],
        menus: [
            { menuId: 1, title: "محصولات" },
            { menuId: 2, title: "جاروبرقی" },
            { menuId: 3, title: "پاکت" },
        ],
        categories: [
            { categoryId: 1, title: "فلزی" },
            { categoryId: 2, title: "لوازم آشپزخانه" },
            { categoryId: 3, title: "الکتریکی" },
        ],
        video: {
            id: 1,
            title: "ویدیو اول",
            description: "ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است"
        },
        article: {
            id: 1,
            title: "مقاله اول",
            description: "کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه "
        },
        comments: [
            {
                id: 1,
                text: "This is the first comment.",
                replies: [
                    { id: 1, text: "This is a reply to the first comment." },
                    { id: 2, text: "Another reply to the first comment." },
                ],
            },
            {
                id: 2,
                text: "This is the second comment.",
                replies: [],
            },
            {
                id: 3,
                text: "This is the third comment.",
                replies: [{ id: 3, text: "Reply to the third comment." }],
            },
        ],
    };

    const { otherAttributes: otherInfo, comments, ...mainInfo } = product;
    mainInfo.commentsCount = 3;

    return (
        <div className="!container w-400 mx-auto p-5">
          <Helmet>
              <title>محصول</title>    
          </Helmet>

          <Summary product={mainInfo} />
          <Supplementary infoGroup={otherInfo} comments={comments} />
        </div>
    );
};

export default ProductPage;

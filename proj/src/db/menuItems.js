const menuItems = [  
    {  
        label: 'خانه',  
        url: '/',  
    },  
    {  
        label: 'درباره ما',  
        url: '/about',  
    },  
    {  
        label: 'خدمات',  
        children: [  
            {  
                label: 'موتور',  
                children: [  
                    { label: 'یخچال', url: '/services/compressor/fragment' },  
                    { label: 'ماشین لباس شویی', url: '/services/compressor/cloudwasher' },  
                ],  
            },  
            {  
                label: 'برد الکترونیک',  
                children: [  
                    { label: 'یخچال', url: '/services/electronic-board/frament' },  
                    { label: 'ماشین لباس شویی', url: '/services/electronic-board/cloudwasher' },  
                ],  
            },  
        ],  
    },  
    {  
        label: 'ارتباط با ما',  
        url: '/contact',  
    },  
]; 


export {
    menuItems
}
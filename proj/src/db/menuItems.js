const menuItems = [  
    {  
        label: 'جاروبرقی',  
        url: '/about',  
    },  
    {  
        label: 'یخچال',  
        url: '/refrigrator',
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
        label: 'لباس شویی',  
        url: '/cloadwasher',  
    },  
    {  
        label: 'کولر گازی',  
        url: '/cooler',  
    },  
    {  
        label: 'مایکروویو',  
        url: '/microwave',  
    },
    {  
        label: 'پنکه',  
        url: '/fan',  
    },  
]; 


export {
    menuItems
}
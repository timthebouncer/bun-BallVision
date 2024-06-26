import './App.css'
import {Link, useParams} from "react-router-dom";
import ballLogo from '../../public/ballLogo.png'


const Articles=()=>{

    const {articleId} = useParams()

    console.log(articleId,'articleId')

    const dataList=[
        {id: 1,title: '123456', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
        {id: 2,title: '456789', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
        {id: 3,title: '987654', content: '籃網隊今天做出兩筆重大交易，將隊上的主將Mikal Bridges給交易至尼克，換回了四張的首輪籤，另外還有把未來的太陽籤交給火箭隊，'},
    ]

    return <div className='container sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl relative flex' style={{background:'#F3F3F3'}}>
        <div className={'flex-1'} style={{width: 736, height: 133}}>
            {
                dataList.map(data=>{
                    return <div key={data.id} className='px-2 py-2 border-b-2 bg-white'>
                        <Link to={`/articles/:${data.id}`} className='flex'>
                            <div className='mr-8'>
                                <img src={ballLogo} alt="" width={170} />
                            </div>
                            <div>
                                <div className={'py-2 mb-2 text-xl'}>
                                    {data.title}
                                </div>
                                <div  style={{fontSize: 14, color: '#9d9b9b'}}>
                                    {data.content}
                                </div>
                            </div>
                        </Link>
                    </div>
                })
            }
        </div>

        <div className={'w-1/5 ml-8 bg-white'}>
            熱門文章
        </div>


    </div>
}

export default Articles
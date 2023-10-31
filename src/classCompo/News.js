import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
// export class News extends Component {
//     static defaultProps={
//         country:'in',
//         pageSize:4,
//         category:'general'
//     }
//     static propTypes={
//         country:PropTypes.string,
//         pageSize:PropTypes.number,
//         category:PropTypes.string
//     }
//     capitalFirst=(string)=>{
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//     constructor(props) {
//         super(props);

//         this.state = {
//             articles: [],
//             loading: true,
//             page:1,
//             totalResults:0,
//             setProgress:0
//         }
//         document.title=`${this.capitalFirst(this.props.category)}`

//     }
//     update=async()=>
//     {   
//         this.props.setProgress(10);
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=46637f02e70443258debb25e4905f17d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         this.setState({loading:true})
//         let data = await fetch(url);
//         this.props.setProgress(40);
//         let parsedData = await data.json()
//         this.props.setProgress(75);
//         this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false})
//         this.props.setProgress(100);
//     }
//     async componentDidMount() {
//         this.update()    
//     }
//     handleNext= async ()=>
//     {

//         this.setState({page: this.state.page+1})
//         this.update()
//     }
//     handlePrev=async ()=>
//     {   
//         this.setState({page: this.state.page-1})
//         this.update()

//     }
//     fetchMoreData = async () => {  
//         this.setState({page: this.state.page + 1})
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json()
//         this.setState({
//             articles: this.state.articles.concat(parsedData.articles),
//             totalResults: parsedData.totalResults
//         })
//       };
//     render() {
//         return (
//             <>
//             {/*  <div className='container my-3'>
//                  <h2 className='text-center'>Headlines- on {this.capitalFirst(this.props.category)}</h2>
//                  {this.state.loading && <Spinner/>}
//                  <div className="row">
//                      {!this.state.loading && this.state.articles.map((element) => {
//             //             return <div className="col-md-4 my-3" key={element.publishedAt}>
//             //                 <NewsItem title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage?element.urlToImage:"https://images.cnbctv18.com/wp-content/uploads/2023/06/2023_6img27_Jun_2023_PTI06_27_2023_000227B-1019x573.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
//             //             </div>
//             //         })}

//             //     </div>
//             //     <div className="container d-flex justify-content-between">
//             //     <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
//             //     <button type="button" disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}className="btn btn-dark" onClick={this.handleNext}>Next</button>
//             //     </div>
//             // </div> */}
//                 <h1 className="text-center" style={{ margin: '35px 0px' }}>Headlines -{this.capitalFirst(this.props.category)}</h1>
//                     {this.state.loading && <Spinner />}
//                     <InfiniteScroll
//                         dataLength={this.state.articles.length}
//                         next={this.fetchMoreData}
//                         hasMore={this.state.articles.length !== this.state.totalResults}
//                         loader={<Spinner/>}
//                     > 
//                         <div className="container">

//                         <div className="row">
//                             {this.state.articles.map((element) => {
//                                 return <div className="col-md-4" key={element.url}>
//                                     <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage?element.urlToImage:"https://images.cnbctv18.com/wp-content/uploads/2023/06/2023_6img27_Jun_2023_PTI06_27_2023_000227B-1019x573.jpg"}  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                                 </div>
//                             })}
//                         </div>
//                         </div> 
//                     </InfiniteScroll>
//                 </>
//         )
//     }
// }
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const update = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=46637f02e70443258debb25e4905f17d&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json()
        props.setProgress(75);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        update();
        document.title = `${capitalFirst(props.category)}`
    }, [])
    const fetchMoreData = async () => {
        const
         url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=46637f02e70443258debb25e4905f17d&page=${page+1}&pageSize=${props.pageSize}    `;
        setPage(page + 1)
        console.log(props.country)
        console.log(props.pageSize)
        console.log(page)
        console.log(props.category)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
    return (
        <>
            
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}> {capitalFirst(props.category)} News</h1>
            
            {
            loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles && articles.length}
                next={fetchMoreData}
                hasMore={articles && articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {articles && articles.filter(article => article.title !== "[Removed]").map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                {/* {console.log(element.title)} */}
                                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageUrl={element.urlToImage ? element.urlToImage : "https://images.cnbctv18.com/wp-content/uploads/2023/06/2023_6img27_Jun_2023_PTI06_27_2023_000227B-1019x573.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 4,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News
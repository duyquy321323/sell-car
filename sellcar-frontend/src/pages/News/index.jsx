import { useEffect, useState } from "react";
import api from "../../api";

const News = () => {

    const [contents, setContents] = useState([]);

    useEffect(() => {
        async function getRecentNews() {
            try{
                const response = await api.get("/news/recent");
                setContents(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        getRecentNews();
    }, [])

    return (
        <>
            {contents.map(item => 
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
            )}
        </>
    );
}

export default News;
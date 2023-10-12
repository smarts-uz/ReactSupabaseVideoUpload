import {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Form, Row, Col, Card} from 'react-bootstrap';
import {createClient} from '@supabase/supabase-js';
import {v4 as uuidv4} from 'uuid';

const supabase = createClient(
    "https://uyjwwcnooayvymdwbcsb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5and3Y25vb2F5dnltZHdiY3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMDUzMTcsImV4cCI6MjAxMjU4MTMxN30.yRU-A6IHLf-OnGvyo45olnWddy1Xz79ImwJdG86zfp4");

// const CDNURL = "https://ihbkpxujdzyblmtuzwdm.supabase.co/storage/v1/object/public/videos/";
const CDNURL = "https://uyjwwcnooayvymdwbcsb.supabase.co/storage/v1/object/public/images/";


// https://ihbkpxujdzyblmtuzwdm.supabase.co/storage/v1/object/public/videos/testfile.mp4

function App() {
    const [videos, setVideos] = useState([]); // [video1, video2, video3]
    const [images, setImages] = useState([])

    async function getVideos() {
        const {data, error} = await supabase
            .storage
            .from('images') // videos/
            .list('')
        // data: [video1, video2, video3]
        // video1: "coopercodesvideo.mp4" CDNLINK.com/coopercodesvideo.mp4

        if (data !== null) {
            setVideos(data);
        } else {
            console.log(error);
            alert("Error grabbing files from Supabase");
        }
    }

    const getImages = async () => {
        const {data, error} = await supabase
            .storage
            .from('images') // videos/
            .list('')


        if (data !== null) {
            setImages(data);
        } else {
            console.log(error);
            alert("Error grabbing files from Supabase");
        }


    }


    useEffect(() => {
        getVideos().then();
    }, [setVideos]);

    async function uploadFile(e) {
        const videoFile = e.target.files[0];
        console.log("Upload!");

        const {error} = await supabase.storage
            .from('videos')
            .upload(uuidv4() + ".mp4", videoFile) // uuidv4() => ASDFASDFASDASFASDF.mp4

        if (error) {
            console.log(error);
            alert("Error uploading file to Supabase");
        }

        await getVideos();

    }

    console.log(videos);

    return (
        <div>
            {/*<Container className='mt-5' style={{width: "700px"}}>*/}
            {/*    <h1>VideoFeed</h1>*/}
            {/*    <Form.Group className="mb-3 mt-3">*/}
            {/*        <Form.Label>Upload your video here!</Form.Label>*/}
            {/*        <Form.Control type="file" accept="video/mp4" onChange={(e) => uploadFile(e)}/>*/}
            {/*    </Form.Group>*/}

            {/*    <Row xs={1} className="g-4">*/}
            {/*        {videos.map((video, index) => {*/}

            {/*            console.log(video);*/}
            {/*            if (video.name === ".emptyFolderPlaceholder") return null;*/}

            {/*            return (*/}
            {/*                <Col>*/}
            {/*                    <Card key={index}>*/}
            {/*                        <video height="380px" controls>*/}
            {/*                            /!*<source src={CDNURL + video.name} type="video/mp4" />*!/*/}
            {/*                            <img src={CDNURL + video.name} alt="img"/>*/}
            {/*                            <p>{video.name}</p>*/}
            {/*                        </video>*/}
            {/*                    </Card>*/}
            {/*                </Col>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </Row>*/}
            {/*</Container>*/}
            <div>
                <button onClick={getImages}>Click</button>
                <ul>
                    {images.map((image, index) => <li><img src={CDNURL+image.name} alt={image.name}/></li>)

                    }
                </ul>
            </div>
        </div>

    );
}

export default App;

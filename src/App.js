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
    const [files, setFiles] = useState([])

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
            .list('', {
                cacheControl: '3600',
                upsert: false
            })


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



    async function uploadImage(e) {
        const imageFile = e.target.files[0];

        const {error} = await supabase.storage
            .from('images')
            .upload(uuidv4() + ".jpeg", imageFile) // uuidv4() => ASDFASDFASDASFASDF.mp4
        console.log("Upload!");

        if (error) {
            console.log(error);
            alert("Error uploading file to Supabase");
        }

        await getImages();

    }

    async function getFiles() {
        const {data, error} = await supabase
            .storage
            .from('files') // videos/
            .list('')
        // data: [video1, video2, video3]
        // video1: "coopercodesvideo.mp4" CDNLINK.com/coopercodesvideo.mp4

        if (data !== null) {
            setFiles(data);
        } else {
            console.log(error);
            alert("Error grabbing files from Supabase");
        }
    }

    async function uploadFile(e) {
        const file = e.target.files[0];
        let formData = new FormData()
        let fileData = formData.append('file', file, 'text' )
        const { data, error } = await supabase
            .storage
            .from('files')
            .upload(uuidv4() + ".txt", fileData, {
                cacheControl: '3600',
                upsert: false
            })

        if (data !== null) {

        } else {
            console.log(error);
            alert("Error grabbing files from Supabase");
        }
    }

    async function downloadFile() {
        const { data, error } = await supabase
            .storage
            .from('images')
            .download('scorpion.jpg')
        
        console.log("Download!");
        console.log(data);

        if (error) {
            console.log(error);
            alert("Error uploading file to Supabase");
        }
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
            <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                <h1>GET images</h1>
                <button onClick={getImages}>Click</button>
                <ul>
                    {images.map((image, index) => {
                            return (
                                <div>
                                    <li><img style={{width: '300px', height: '300px'}} src={CDNURL + image.name}
                                             alt={image.name}/></li>
                                    <p key={index}>{image.name}</p>
                                </div>
                            )
                        }
                    )}
                </ul>
            </div>

            <div>
                <h1>Upload images</h1>
                <input type="file" onChange={(e) => uploadImage(e)}/>
            </div>

            <div>
                <h1>GET files</h1>
                <input type="file" onChange={(e)=> uploadFile(e)}/>
            </div>
            <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                <h1>GET file names</h1>
                <button onClick={getFiles}>Click</button>
                <ul>
                    {files.map((file, index) => {
                            return (
                                <div>
                                <li key={index}>
                                    <p key={index}>{file.name}</p>
                                </li>
                                </div>
                            )
                        }
                    )}
                </ul>
            </div>

            <div>
                <button onClick={downloadFile} >Download</button>
            </div>
        </div>

    );
}

export default App;

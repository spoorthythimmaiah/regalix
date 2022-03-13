export function captureScreen(callback) {
    invokeGetDisplayMedia((screen) => {
        addStreamStopListener(screen, function () {
            let stopBtn = document.getElementById('btn-stop-recording');
            if(stopBtn){
                stopBtn.click();
            }
        });
        callback(screen);
    }, (error) => {
        console.error(error);
        alert('Unable to capture your screen. Please check console logs.\n' + error);
    });
}

export function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(callback);
}

export function captureAudio(callback) {
    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(callback);
}

export function invokeGetDisplayMedia(success, error) {
    var displaymediastreamconstraints =
    {
        video:
        {
            displaySurface: 'monitor', // monitor, window, application, browser
            logicalSurface: true,
            cursor: 'always' // never, always, motion
        }
    };
    displaymediastreamconstraints = { video: true };
    if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    } else {
        navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
    }
}

export function stopRecordingCallback(root, recorder, stream) {
    recorder.stopRecording(() => {
        let blob = recorder.getBlob();
        root.setState({
            recordedBlob: blob
        })
        document.querySelector('video').muted = false;
        getSeekableBlob(blob, (seekableBlob) => {
            document.querySelector('video').srcObject = null;
            document.querySelector('video').controls = true;
            document.querySelector('video').src = URL.createObjectURL(seekableBlob);
            document.querySelector('video').pause();
            console.log("Stopping the recording");
            stream.forEach((stream) => {
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            });
        })
        root.updateRecordingStatus('stopped');
    });			
};

export function pauseRecording(recorder) {
    recorder.pauseRecording()
}

export function resumeRecording(recorder) {
    recorder.resumeRecording()
}

export function keepStreamActive(stream) {
    var video = document.createElement('video');
    video.muted = true;
    video.srcObject = stream;
    video.style.display = 'none';
    (document.body || document.documentElement).appendChild(video);
}

export function addStreamStopListener(stream, callback) {
    stream.addEventListener('ended', () => {
        callback();
        callback = function () { };
    }, false);
    stream.addEventListener('inactive', () => {
        callback();
        callback = function () { };
    }, false);
    stream.getTracks().forEach((track) => {
        track.addEventListener('ended', function () {
            callback();
            callback = function () { };
        }, false);
        track.addEventListener('inactive', function () {
            callback();
            callback = function () { };
        }, false);
    });
}
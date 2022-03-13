import * as utils from './recorderUtils'


export function cameraRecorder(root) {
    utils.captureCamera((camera) => {
        root.resetRecordingTypeOptions()
        root.updateRecordingStatus('started');
        var recorder = RecordRTC([camera],
            {
                type: 'video',
                mimeType: 'video/webm',
                previewStream: function (s) {
                    document.querySelector('video').muted = true;
                    document.querySelector('video').controls = false;
                    document.querySelector('video').autoplay = true;
                    document.querySelector('video').srcObject = s;
                }
            });
        recorder.startRecording();
        document.getElementById('btn-stop-recording').disabled = false;
        document.getElementById('btn-stop-recording').onclick = function() {
            this.disabled = true;
            utils.stopRecordingCallback(root, recorder, [camera]);
        };
        if(root.state.activeSection.time_limit > 0) { 
            window.timeout = setTimeout(() => {
                utils.stopRecordingCallback(root, recorder, [camera])
            }, root.state.activeSection.time_limit*60*1000);
        }
    });
}
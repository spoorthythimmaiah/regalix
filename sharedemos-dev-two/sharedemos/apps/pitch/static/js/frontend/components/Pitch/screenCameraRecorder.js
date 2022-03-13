import * as utils from './recorderUtils'


export function screenCameraRecorder(root) {
    utils.captureScreen((screen) => {
        utils.keepStreamActive(screen);
        utils.captureCamera((camera) => {
            utils.keepStreamActive(camera);
            screen.width = window.screen.width;
            screen.height = window.screen.height;
            screen.fullcanvas = true;
            camera.width = 320;
            camera.height = 240;
            camera.top = screen.height - camera.height;
            camera.left = screen.width - camera.width;
            root.resetRecordingTypeOptions()
            root.updateRecordingStatus('started');
            var recorder = RecordRTC([screen, camera],
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
                utils.stopRecordingCallback(root, recorder, [screen, camera]);
            };
            document.getElementById('pause-recording').onclick = function() {
                utils.pauseRecording(recorder)
            }
            document.getElementById('resume-recording').onclick = function() {
                utils.resumeRecording(recorder)
            }
            if(root.state.activeSection.time_limit > 0) { 
                window.timeout = setTimeout(() => {
                    utils.stopRecordingCallback(root, recorder, [screen, camera])
                }, root.state.activeSection.time_limit*60*1000);
            }
        });
    });
}
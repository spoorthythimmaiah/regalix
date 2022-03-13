import * as utils from './recorderUtils'


export function screenRecorder(root) {
    utils.captureScreen((screen) => {
        utils.keepStreamActive(screen);
        utils.captureAudio((audio) => {
            utils.keepStreamActive(audio);
            screen.width = window.screen.width;
            screen.height = window.screen.height;
            screen.fullcanvas = true;
            root.resetRecordingTypeOptions()
            root.updateRecordingStatus('started');
            var recorder = RecordRTC([screen, audio],
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
                utils.stopRecordingCallback(root, recorder, [screen, audio]);
            };
            if(root.state.activeSection.time_limit > 0) { 
                window.timeout = setTimeout(() => {
                    utils.stopRecordingCallback(root, recorder, [screen, audio])
                }, root.state.activeSection.time_limit*60*1000);
            }
        });
    });
}
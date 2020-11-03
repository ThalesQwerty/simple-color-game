export default class SFXPlayer {
    static muted = false;

    static play(audio: HTMLAudioElement) {
        if (!this.muted) audio.play();
    }
}

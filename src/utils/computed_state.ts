import {
    GameState
} from "../data";

function isInMenu(state: number) {
    return state === GameState.MENU;
}

function isInHighscores(state: number) {
    return state === GameState.HIGHSCORES;
}

function isInGame(state: number) {
    return !isInMenu(state) && !isInHighscores(state);
}

function isGameOver(state: number) {
    return state === GameState.GAME_OVER;
}

export default {
    isInMenu,
    isInGame,
    isInHighscores,
    isGameOver,
}
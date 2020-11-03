'use strict'

const Score  = use("App/Models/Score");

class ScoreController {
    async store({ request, response, params }) {
        const data = request.all();

        const score = new Score();
        score.score = data.score;
        score.user_id = params.id;
        await score.save();

        return response.status(200).json({"id": score.user_id, "score": data.score});
    }

    formatDate(date) {
        const parts = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate() + 1,
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds()
        };

        for (const part in parts) {
            parts[part] += '';
            if (part != 'y' && parts[part].length < 2) {
                parts[part] = '0' + parts[part];
            }
        }

        const {y, m, d, h, i, s} = parts;

        return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s + '+ 00';
    }

    async index({ request }) {

        const timestamp = request.all().timestamp ? new Date().getTime() - request.all().timestamp : 0;
        const date = new Date(timestamp);
        const formattedDate = this.formatDate(date);

        const table = await (timestamp ?
            Score.query().with('user').whereRaw('created_at >= timestamp \'' + formattedDate + '\'').orderBy('score', 'desc').fetch() :
            Score.query().with('user').orderBy('score', 'desc').fetch());

        const userIds = [];

        const highscores = [];

        for (const row of table.rows) {
            if (userIds.indexOf(row.user_id) < 0) {
                userIds.push(row.user_id);
                highscores.push(row);
            }
        }

        return highscores;
    }
}

module.exports = ScoreController

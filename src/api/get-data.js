import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const jsonPath = path.join(process.cwd(), 'db.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    const { type } = req.query;

    if (type === 'register') {
        res.status(200).json(jsonData.register);
    } else if (type === 'posts') {
        res.status(200).json(jsonData.posts);
    } else if (type === 'users') {
        res.status(200).json(jsonData.users);
    } else {
        res.status(200).json(jsonData);
    }
}
const path = require('path');

const { osu_db_concat_sr, osu_db_save } = require('osu-tools');

module.exports = {
	launch: ({ db1_path, db2_path }) => {
		const result = osu_db_concat_sr( {folder_path: db1_path}, {folder_path: db2_path});
		console.log('[ saving ]');
		osu_db_save(result, 'osu!.db');
	}
}
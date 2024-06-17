const calculation_progress = require('./calculation_progress');
const osu_db_concat = require('./osu_db_concat');

const downoaded_db_path = 'C:\\Users\\sadgod\\Downloads\\osu! (1)';
const osu_game_path = 'D:\\osu!';

const args = process.argv.slice(2);

if (args.length > 0) {
	if (args.indexOf('concat') > -1){
    	osu_db_concat.launch({ db1_path: osu_game_path, db2_path: downoaded_db_path });
	}
} else {
	calculation_progress.launch({ osu_path: 'F:\\node_js_stuff\\node_projects\\osu_db_calculation' });
}



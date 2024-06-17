const path = require('path');

const {osu_db_load, beatmap_property} = require('osu-tools');


module.exports = {
	launch: ({ osu_path, osu_db_filename = 'osu!.db' }) => {

		const osu_db_result = osu_db_load( path.join(osu_path, osu_db_filename), [
			beatmap_property.star_rating_std,
			beatmap_property.star_rating_taiko,
			beatmap_property.star_rating_ctb,
			beatmap_property.star_rating_mania,
			beatmap_property.gamemode
		], { print_progress: true });

		const gamemode = ['osu', 'taiko', 'ctb', 'mania'];

		const print_results = (gamemode_int, beatmaps) => {
			const skip_gamemodes = [
				[1,3],[1,2],[1,0],
				[2,3],[2,1],[2,0],
				[3,2],[3,1],[3,0]
			];

			for (let i in gamemode) {
				if(skip_gamemodes.findIndex( x => x[0] == gamemode_int && x[1] == i ) > -1 ) continue;
				
				const total = beatmaps[i].count + beatmaps[i].not_count;
				console.log('карты', gamemode[gamemode_int],`(стар-рейтинг ${gamemode[i]})`)
				console.log(' * посчитанных карт', beatmaps[i].count, '/', total, `(${(beatmaps[i].count/total*100).toFixed(2)}%)`);
				console.log(' * не посчитанных карт', beatmaps[i].not_count, '/', total, `(${(beatmaps[i].not_count/total*100).toFixed(2)}%)`);
			}

		}

		for(let gamemode_int = 0; gamemode_int<=3; gamemode_int++) {
			const beatmaps = osu_db_result.beatmaps.filter( x => x.gamemode_int === gamemode_int );

			const osu = {
				count: (beatmaps.filter( x => x.star_rating_std.length > 0) || []).length,
				not_count: (beatmaps.filter( x => x.star_rating_std.length === 0) || []).length
			}

			const taiko = {
				count: (beatmaps.filter( x => x.star_rating_taiko.length > 0) || []).length,
				not_count: (beatmaps.filter( x => x.star_rating_taiko.length === 0) || []).length
			}

			const ctb = {
				count: (beatmaps.filter( x => x.star_rating_ctb.length > 0) || []).length,
				not_count: (beatmaps.filter( x => x.star_rating_ctb.length === 0) || []).length
			}

			const mania = {
				count: (beatmaps.filter( x => x.star_rating_mania.length > 0) || []).length,
				not_count: (beatmaps.filter( x => x.star_rating_mania.length === 0) || []).length
			}
			
			print_results( gamemode_int, [osu, taiko, ctb, mania] );

		}

	}
}
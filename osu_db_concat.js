const path = require('path');

const {osu_db_load, all_beatmap_properties, osu_db_save, beatmap_property} = require('osu-tools');

module.exports = {
	launch: ({ db1_path, db2_path, osu_db_filename = 'osu!.db' }) => {

		console.log('[ loading db 1 ]');
		const result = osu_db_load( path.join(db1_path, osu_db_filename), all_beatmap_properties, { print_progress: true });

		console.log('[ loading db 2 ]');
		const osu_db_2_result = osu_db_load( 
			path.join(db2_path, osu_db_filename), [ 
				beatmap_property.beatmap_md5,
				beatmap_property.star_rating_std, 
				beatmap_property.star_rating_taiko,
				beatmap_property.star_rating_ctb, 
				beatmap_property.star_rating_mania], 
			{ print_progress: true });

		const srs = ['star_rating_std', 'star_rating_taiko', 'star_rating_ctb', 'star_rating_mania'];

        console.log('[ comparing ]');

		for (let i = 0; i < result.beatmaps.length; i++){
			if (i % 1000 == 0) {
				console.log('compare', i, '/', result.beatmaps.length, `${(i/result.beatmaps.length*100).toFixed(2)}` ,'maps');
			}

			if ( result.beatmaps[i].beatmap_md5.length !== 32) {
				continue;
			}

			const idx = osu_db_2_result.beatmaps.findIndex( v => v.beatmap_md5 === result.beatmaps[i].beatmap_md5 );

			if (idx == -1) {
				continue;
			}

			//console.log('found beatmap', osu_db_2_result.beatmaps[idx].beatmap_md5 );

			for (let sr of srs) {
				if (result.beatmaps[i][sr].length == 0) {
					if (osu_db_2_result.beatmaps[idx][sr].length > 0) {
						result.beatmaps[i][sr] = osu_db_2_result.beatmaps[idx][sr];
					}
                }
			}
		}

		console.log('[ saving ]');
		osu_db_save(result, 'osu!.db');

	}
}
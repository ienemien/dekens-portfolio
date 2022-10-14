<?php

// add material projects field
function new_projects_fields( $fields ) {
	$fields['datum'] = array(
		'name'        => __( 'Datum', 'projects' ),
		'description' => __( 'Begin and enddate of the project', 'projects' ),
		'type'        => 'text',
		'default'     => '',
		'section'     => 'info'
	);

	return $fields;
}

add_filter( 'projects_custom_fields', 'new_projects_fields' );

/**
 * Add REST API support for projects
 */
add_filter( 'register_post_type_args', 'my_post_type_args', 10, 2 );
 
function my_post_type_args( $args, $post_type ) {
 
    if ( 'project' === $post_type ) {
        $args['show_in_rest'] = true;
 
        // Optionally customize the rest_base or rest_controller_class
        $args['rest_base']             = 'projects';
        $args['rest_controller_class'] = 'WP_REST_Posts_Controller';
    }
 
    return $args;
}

/**
 * Add REST API support for project categories
 */
add_filter( 'register_taxonomy_args', 'my_taxonomy_args', 10, 2 );
 
function my_taxonomy_args( $args, $taxonomy_name ) {
 
    if ( 'project-category' === $taxonomy_name ) {
        $args['show_in_rest'] = true;
 
        // Optionally customize the rest_base or rest_controller_class
        $args['rest_base']             = 'project-categories';
        $args['rest_controller_class'] = 'WP_REST_Terms_Controller';
    }
 
    return $args;
}

// get gallery belonging to project
function rest_get_project_gallery( $data ) {
	$project_id = $data[ 'project_id' ];
    //set FALSE for data output
    $gallery = projects_get_gallery_attachment_ids( $project_id, FALSE );

    if ( empty( $gallery ) ) {
        return NULL;
    }
	
	$project_gallery = array();
	foreach ( $gallery as $attachment_id ) {
		$image = array();
		$post = get_post($attachment_id);
		$image['data'] = $post;
		$image['meta'] = wp_get_attachment_metadata($attachment_id);
		
		// Ensure empty details is an empty object.
		if ( empty( $image['meta'] ) ) {
			$image['meta'] = new stdClass;
		} elseif ( ! empty( $image['meta']['sizes'] ) ) {
			
			foreach ( $image['meta']['sizes'] as $size => &$size_data ) {

				if ( isset( $size_data['mime-type'] ) ) {
					$size_data['mime_type'] = $size_data['mime-type'];
					unset( $size_data['mime-type'] );
				}

				// Use the same method image_downsize() does.
				$image_src = wp_get_attachment_image_src( $post->ID, $size );
				if ( ! $image_src ) {
					continue;
				}

				$size_data['source_url'] = $image_src[0];
			}

			$full_src = wp_get_attachment_image_src( $post->ID, 'full' );

			if ( ! empty( $full_src ) ) {
				$image['meta']['sizes']['full'] = array(
					'file'       => wp_basename( $full_src[0] ),
					'width'      => $full_src[1],
					'height'     => $full_src[2],
					'mime_type'  => $post->post_mime_type,
					'source_url' => $full_src[0],
				);
			}
		} else {
			$image['meta']['sizes'] = new stdClass;
		}
		
		array_push($project_gallery, $image);
	}
	
    //comma separated list of ids
    return $project_gallery;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'gallery-plugin/v1', '/project/(?P<project_id>\d+)', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'rest_get_project_gallery',
		'permission_callback' => '__return_true'
    ) );
} );
?>
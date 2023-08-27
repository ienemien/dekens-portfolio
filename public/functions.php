<?php

add_theme_support( 'post-thumbnails' );

function getTitle($id) {
    return get_the_title($id);
}

register_rest_field( 'post', 'gallery', array(
    'get_callback' => function ( $data ) {
        $gallery = get_post_meta( $data['id'], '_project_image_gallery', '' );
        if(!is_null($gallery) && sizeof($gallery) > 0) {
        $gallery_ids = explode(",", $gallery[0]);
        $gallery_titles = array_map("getTitle", $gallery_ids);
        return $gallery_titles;
        }
        return [];
    }, ));
    
?>
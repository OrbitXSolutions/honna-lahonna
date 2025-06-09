NOTES for the service provider forms,
it's only 2 steps,
before he starts he would get first information about what is required from him,
you can check the schema from `schema.prisma` file #file:schema.prisma
the first step would has:

- `logo_image_file` => `logo_image`: the service image/logo (will use supabase server function to upload the image to the images bucked under the service_prvider folder and storing its filename) check supabase file #file:supabase.ts
- `service_name`: service name
- `service_description`: descriping his services (service_description)
- `service_category_id`: category
- `governorate_id`: governorate
- `years_of_experience`: years of experinces
- `service_delivery_method`: a way to communicate and it is dropdown,
  enum service_delivery_method {
  online
  offline
  both
  }
- `address`: address (if he picked offline or both)
- `official_url`: official url (if he picked online or both and is optional)
- `bio`: personal bio
- `services`: services (comma seprator list of sub services) optional also
- `facebook_url`, `instagram_url`, `whatsapp_url`, `other_urls`: social media links (other_urls (comma seperator), maximum 4)
- `slug`: his url on the site
- `keywords`: for seo

the second step (trust documents) and would be private for the admin only:

- `id_card_front_image`: the front of his ID pic (would take a pic of his ID)
- `id_card_back_image`: the back of his ID pic
- `video_url_file` => `video_url`: video (self recording video, upload using supabase ssr client that I'm using also, bucket called "videos")
- `certificates_images_files[]` => `certificates_images`: certificates to upload to the `images` bucket (maximum 4) (use comma seperators for filenames) optional
- `document_list_files[]` => `document_list`: =>other documents to upload to the `images` bucket and storing its file names also (maximum 4) (use comma seperators for filenames) optional
- `notes`: notes for admin

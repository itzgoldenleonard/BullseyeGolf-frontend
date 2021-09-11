#avif
npx @squoosh/cli --resize '{"enabled":true,"width":1008,"height":756,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --avif '{"cqLevel":23,"cqAlphaLevel":-1,"subsample":1,"tileColsLog2":0,"tileRowsLog2":0,"speed":6,"chromaDeltaQ":false,"sharpness":0,"denoiseLevel":0,"tune":0}' default-header.png
mv default-header.avif default-header-large.avif
echo "Converted to avif large"
npx @squoosh/cli --resize '{"enabled":true,"width":756,"height":567,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --avif '{"cqLevel":23,"cqAlphaLevel":-1,"subsample":1,"tileColsLog2":0,"tileRowsLog2":0,"speed":6,"chromaDeltaQ":false,"sharpness":0,"denoiseLevel":0,"tune":0}' default-header.png
mv default-header.avif default-header-medium.avif
echo "Converted to avif medium"
npx @squoosh/cli --resize '{"enabled":true,"width":504,"height":378,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --avif '{"cqLevel":23,"cqAlphaLevel":-1,"subsample":1,"tileColsLog2":0,"tileRowsLog2":0,"speed":6,"chromaDeltaQ":false,"sharpness":0,"denoiseLevel":0,"tune":0}' default-header.png
mv default-header.avif default-header-small.avif
echo "Converted to avif small"


#jpg
npx @squoosh/cli --resize '{"enabled":true,"width":1008,"height":756,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --mozjpeg '{"quality":67,"baseline":false,"arithmetic":false,"progressive":true,"optimize_coding":true,"smoothing":0,"color_space":3,"quant_table":3,"trellis_multipass":false,"trellis_opt_zero":false,"trellis_opt_table":false,"trellis_loops":1,"auto_subsample":true,"chroma_subsample":2,"separate_chroma_quality":false,"chroma_quality":75}' default-header.png
mv default-header.jpg default-header-large.jpg
echo "Converted to jpg large"
npx @squoosh/cli --resize '{"enabled":true,"width":756,"height":567,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --mozjpeg '{"quality":67,"baseline":false,"arithmetic":false,"progressive":true,"optimize_coding":true,"smoothing":0,"color_space":3,"quant_table":3,"trellis_multipass":false,"trellis_opt_zero":false,"trellis_opt_table":false,"trellis_loops":1,"auto_subsample":true,"chroma_subsample":2,"separate_chroma_quality":false,"chroma_quality":75}' default-header.png
mv default-header.jpg default-header-medium.jpg
echo "Converted to jpg medium"
npx @squoosh/cli --resize '{"enabled":true,"width":504,"height":378,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --mozjpeg '{"quality":67,"baseline":false,"arithmetic":false,"progressive":true,"optimize_coding":true,"smoothing":0,"color_space":3,"quant_table":3,"trellis_multipass":false,"trellis_opt_zero":false,"trellis_opt_table":false,"trellis_loops":1,"auto_subsample":true,"chroma_subsample":2,"separate_chroma_quality":false,"chroma_quality":75}' default-header.png
mv default-header.jpg default-header-small.jpg
echo "Converted to jpg small"



# webp
npx @squoosh/cli --resize '{"enabled":true,"width":1008,"height":756,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --webp '{"quality":48.1,"target_size":0,"target_PSNR":0,"method":6,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' default-header.png
mv default-header.webp default-header-large.webp
echo "Converted to webp large"
npx @squoosh/cli --resize '{"enabled":true,"width":756,"height":567,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --webp '{"quality":48.1,"target_size":0,"target_PSNR":0,"method":6,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' default-header.png
mv default-header.webp default-header-medium.webp
echo "Converted to webp medium"
npx @squoosh/cli --resize '{"enabled":true,"width":504,"height":378,"method":"lanczos3","fitMethod":"stretch","premultiply":true,"linearRGB":true}' --webp '{"quality":48.1,"target_size":0,"target_PSNR":0,"method":6,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' default-header.png
mv default-header.webp default-header-small.webp
echo "Converted to webp small"

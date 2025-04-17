export function getAbsoluteUrl(url){
    return url.startsWith('http') ? url : `https://${url}`
}
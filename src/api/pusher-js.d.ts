// Solution for type missing for pusher-js
// See https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
declare module 'pusher-js' {
    export default Pusher;
};
export const LOADER_COMPLETE_EVENT = "eve-jean:loader-complete";

export function dispatchLoaderComplete() {
  window.dispatchEvent(new CustomEvent(LOADER_COMPLETE_EVENT));
}

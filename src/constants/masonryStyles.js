export const MASONRY_STYLES = {
  poster: {
    label: "海報視圖",
    container: "columns-1 sm:columns-2 lg:columns-2 xl:columns-3 gap-5 w-full",
    card: "break-inside-avoid cursor-pointer group mb-5 transition-all duration-500 relative overflow-hidden rounded-2xl isolate border-2 border-white hover:shadow-[0_0_25px_rgba(251,146,60,0.6)]",
    newCard: "hidden md:block",
    imageWrapper: "relative w-full overflow-hidden rounded-xl bg-gray-100",
    image: "w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110",
    infoArea: "absolute bottom-0 left-0 right-0 p-6 bg-white/10 backdrop-blur-md border-t border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out text-white rounded-b-xl",
    titleClass: "font-bold text-lg leading-snug drop-shadow-md text-center",
    actionButtonClass: "p-3 bg-white/20 text-white rounded-full hover:bg-white hover:text-gray-900 backdrop-blur-md transition-all duration-300 border border-white/30",
    actionIcon: "arrow",
    actionIconSize: 20,
    showNewCardText: false
  },
  classic: {
    label: "經典視圖",
    container: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20",
    card: "break-inside-avoid rounded-[36px] hover:shadow-2xl transition-all duration-300 cursor-pointer group p-2.5 relative overflow-hidden",
    newCard: "break-inside-avoid rounded-[36px] hover:shadow-2xl transition-all duration-300 cursor-pointer group p-2.5 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]",
    newCardIconWrapper: "w-20 h-20 rounded-full bg-gradient-to-br from-orange-100/60 to-orange-200/60 backdrop-blur-sm text-orange-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md border border-white/40",
    imageWrapper: "relative w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-100 to-gray-200",
    image: "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-[28px]",
    infoArea: "px-3 pt-5 pb-6",
    newCardIconSize: 36,
    showNewCardText: true
  },
  compact: {
    label: "緊湊視圖",
    container: "columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3 pb-20",
    card: "break-inside-avoid rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group p-1.5 relative overflow-hidden",
    newCard: "break-inside-avoid rounded-2xl hover:shadow-lg transition-all duration-200 cursor-pointer group p-1.5 relative overflow-hidden flex flex-col items-center justify-center min-h-[200px]",
    newCardIconWrapper: "w-12 h-12 rounded-full bg-gradient-to-br from-orange-100/60 to-orange-200/60 backdrop-blur-sm text-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md border border-white/40",
    imageWrapper: "relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200",
    image: "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl",
    infoArea: "px-2 pt-2 pb-3",
    newCardIconSize: 24,
    showNewCardText: true
  },
  minimal: {
    label: "極簡視圖",
    container: "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20 w-full px-4",
    card: "break-inside-avoid rounded-[32px] transition-all duration-500 cursor-pointer group relative overflow-hidden bg-gray-100 isolate hover:shadow-2xl",
    newCard: "break-inside-avoid rounded-[32px] transition-all duration-500 cursor-pointer group relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] bg-gray-50 border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50",
    newCardIconWrapper: "w-16 h-16 rounded-full bg-white text-orange-500 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300",
    imageWrapper: "relative w-full h-full",
    image: "w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110",
    infoArea: "absolute bottom-0 left-0 right-0 p-6 bg-white/10 backdrop-blur-md border-t border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out text-white",
    titleClass: "font-bold text-lg text-white leading-snug drop-shadow-md",
    newCardIconSize: 32,
    showNewCardText: true,
    actionButtonClass: "p-3 bg-white/20 text-white rounded-full hover:bg-white hover:text-gray-900 backdrop-blur-md transition-all duration-300 border border-white/30",
    actionIcon: "arrow",
    actionIconSize: 20
  },
  list: {
    label: "列表視圖",
    container: "flex flex-col gap-4 pb-20 max-w-3xl mx-auto",
    card: "w-full rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group p-2 relative overflow-hidden flex gap-4 bg-white/60",
    newCard: "w-full rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group p-4 relative overflow-hidden flex items-center justify-center min-h-[100px] border-2 border-dashed border-gray-300",
    newCardIconWrapper: "w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mr-4 group-hover:text-orange-500 transition-colors",
    imageWrapper: "relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200",
    image: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl",
    infoArea: "flex-1 py-2 flex flex-col justify-center",
    newCardIconSize: 24,
    showNewCardText: true
  }
};

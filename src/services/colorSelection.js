const COLORS = [
    '#FFAD34', '#FFF281', '#FEFFF8', '#FFF0CE',
    '#FFE792', '#F9CF5F'
  ];

export default class ColorSelection {
    getUsernameColor (username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
           hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
      }
}
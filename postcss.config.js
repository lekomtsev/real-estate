module.exports = {
    plugins: [
        // Проставляет префиксы стилям
        require('autoprefixer'),
        // Сжимает медиа запросы
        require('css-mqpacker'),
        // Максимально минифицирует исходные стили
        require('cssnano')({
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true,
                    }
                }
            ]
        })
    ]
}

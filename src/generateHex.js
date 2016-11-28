export const getVertice = (center, side_length) => {
    let angle = Math.PI/3;
    let vertices = [];
    for(angle; angle<Math.PI*2; angle += Math.PI/3){
        const x = parseInt(Math.cos(angle)*side_length+center[0], 10);
        const y = parseInt(Math.sin(angle)*side_length+center[1], 10);
        vertices.push(`${x},${y}`);
    }
    return vertices
};

export const getCenters = (center, side_length, layers) => {
    let centers = [];
    for(let layer=1; layer<layers; layer++){
        let angle = Math.PI/(6);
        for(angle; angle<=Math.PI*2; angle += Math.PI/3){
            const x = parseInt(Math.cos(angle)*layer*2*side_length+center[0], 10);
            const y = parseInt(Math.sin(angle)*layer*2*side_length+center[1], 10);
            const a = parseInt(Math.cos(angle + Math.PI/3)*layer*2*side_length+center[0], 10);
            const b = parseInt(Math.sin(angle + Math.PI/3)*layer*2*side_length+center[1], 10);
            centers.push([x,y]);
            if(layer > 1){
                const t = 1/layer;
                for (let i = 1; i<layer; i++){
                    const c = x * (1-t*i) + a * t * i;
                    const d = y * (1-t*i) + b * t * i;
                    centers.push([c,d]);
                }
            }
        }
    }
    return centers
};


export const generateHex = (main_center, side_length, layers) => {
    let total_vertices_set = [];
    for (let vertice of getVertice(main_center, side_length)){
        total_vertices_set.push(vertice.split(','));
    }
    let all_centers = getCenters(main_center, side_length, layers);
    for(let new_center of all_centers){
        for (let vertice of getVertice(new_center, side_length)){
            if(total_vertices_set.indexOf(vertice) === -1){
                total_vertices_set.push(vertice.split(','));
            }
        }
    }
    return total_vertices_set
};

// export const lineDraw = (ax,ay,bx,by) => {
//     if(ay>by){
//         bx=ax+bx;
//         ax=bx-ax;
//         bx=bx-ax;
//         by=ay+by;
//         ay=by-ay;
//         by=by-ay;
//     }
//     let calc=Math.atan((ay-by)/(bx-ax));
//     calc=calc*180/Math.PI;
//     let length=Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));
// }

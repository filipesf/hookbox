# Regenerate the logo chest: python3 tools/chest.py (edit chest.grid, one char per colour)
import sys
from pathlib import Path

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent
P=dict(K='#1e140f',W='#4a2e1c',D='#7a4e2e',G='#e2b54a',H='#f5d27a',B='#ab7640',s='#4b4e6d',m='#8a8fb0',l='#c9cde0')
secs={};cur=None
for ln in open(HERE/'chest.grid').read().split('\n'):
    if ln.startswith('#') or not ln: continue
    if ln.startswith('['): cur=ln.strip('[]'); secs[cur]=[]; continue
    secs[cur].append(ln)
bad=0
for k,v in secs.items():
    if len(v)!=32: print(k,'rows',len(v)); bad=1
    for i,r in enumerate(v):
        if len(r)!=32: print(k,'row',i,'len',len(r)); bad=1
if bad: sys.exit(1)
g=[list(r) for r in secs['base']]
for y,r in enumerate(secs['hook']):
    for x,ch in enumerate(r):
        if ch!='.': g[y][x]=ch
rects=[]
for c,col in P.items():
    d=''
    for y,r in enumerate(g):
        x=0
        while x<32:
            if r[x]==c:
                e=x
                while e<32 and r[e]==c:e+=1
                d+=f'M{x} {y}h{e-x}v1h-{e-x}z';x=e
            else:x+=1
    if d: rects.append(f'<path fill="{col}" d="{d}"/>')
out='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">'+''.join(rects)+'</svg>'
open(ROOT/'src'/'assets'/'chest.svg','w').write(out)
open(ROOT/'public'/'favicon.svg','w').write(out)
print(len(out.encode()))

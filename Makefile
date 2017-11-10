build:
	docker-compose up -d --build
	tput bel

clean:
	docker rm -f pmm-client pmm-server pmm-data; docker rmi -f `docker images -q`

deploy:
	cd simple-app && npm run build && cd ..
	tar czf simple-app.tar.gz simple-app
	docker exec pmm-server supervisorctl stop grafana || true
	docker exec pmm-server bash -c 'rm -rf /var/lib/grafana/plugins/simple-app*' || true
	docker cp simple-app.tar.gz pmm-server:/var/lib/grafana/plugins/
	docker exec pmm-server bash -c 'cd /var/lib/grafana/plugins/ && tar xzf simple-app.tar.gz'
	docker exec pmm-server supervisorctl start grafana
	tput bel
